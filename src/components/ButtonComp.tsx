export default function ButtonComp({ className, label, onClickProp }: { className?: string, label: string, onClickProp?: React.MouseEventHandler<HTMLButtonElement>}) {
    return ( 
        <button className={className} onClick={onClickProp}>{label}</button>
    )
}