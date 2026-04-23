interface BreadcrumbsButtonVar1Props {
    items?: { title: string, onClick: () => void }[];
}


export default function BreadcrumbsButtonVar1({ items }: BreadcrumbsButtonVar1Props) {
    return (
        <div className="breadcrumbs text-sm">
            <ul>
                {items?.map((item, index) => (
                    <li key={index} className="text-gray-400">
                        <a onClick={item.onClick} className="cursor-pointer">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}