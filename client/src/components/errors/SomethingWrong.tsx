
interface Props {}

function SomethingWrong(props: Props) {
    const {} = props

    return (
        <div className="h-40 text-center">
            <h1 className="text-4xl">Something Went Wrong</h1>
            <p className="text-2xl">Please try again</p>
        </div>
    )
}

export default SomethingWrong
