// src/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set(name, value, options);
        },
        remove(name, options) {
          response.cookies.set(name, "", options);
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // Jika tidak ada user dan mencoba mengakses halaman terproteksi, lempar ke /
  if (!user) {
    if (path !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  }

  // Jika ada user, ambil role dari database (karena tidak ada di auth.user)
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = userData?.role;

  // Logika pengalihan berdasarkan role
  if (role === "super_bos") {
    // Hanya redirect jika tidak sedang di halaman admin
    if (!path.startsWith("/page/admin_page")) {
      return NextResponse.redirect(new URL("/page/admin_page/halaman_utama", request.url));
    }
  } else if (role === "users") {
    // Hanya redirect jika tidak sedang di halaman user
    if (!path.startsWith("/page/users")) {
      return NextResponse.redirect(new URL("/page/users/halaman_utama", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/page/admin_page/:path*", "/page/users/:path*", "/"],
};