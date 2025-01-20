
interface Props {}

function Error404(props: Props) {
    const {} = props

    return (
        <div className="h-40 text-center">
            <h1 className="text-4xl text-primary">404: Page not found</h1>
            <h2 className="text-2xl">This page does not exist</h2>
        </div>
    )
}

export default Error404
