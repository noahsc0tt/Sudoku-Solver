import "../stylesheets/styles.css"

type ButtonProps = {
    onClick: (...args: any[]) => any
    label: string
}

export default function Button(props: ButtonProps) {
    return <button onClick={props.onClick}>{props.label}</button>
}
