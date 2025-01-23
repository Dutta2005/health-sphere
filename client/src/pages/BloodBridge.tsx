import { useState } from "react";
import { Button } from "../components/ui/button"
import RequestForm from "../components/blood bridge/RequestForm";

function BloodBridge() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
            <h1 className="text-4xl text-center font-semibold">BloodBridge</h1>
            <Button className="mt-4 bg-primary dark:bg-primary dark:text-dark-text" onClick={() => setOpen(true)}>Request Blood</Button>
            {open && <RequestForm />}
        </div>
    )
}

export default BloodBridge
