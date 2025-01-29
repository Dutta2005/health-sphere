import { useNavigate } from "react-router"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

function BackBtn({ cn = "" }: { cn?: string }) {
    const navigate = useNavigate()

    return (
        <Button
            className={`${cn} flex items-center`}
            onClick={() => navigate(-1)}
        >
            <ArrowLeft className="w-4 h-4 mr-2" /><span>Back</span>
        </Button>
    )
}

export default BackBtn
