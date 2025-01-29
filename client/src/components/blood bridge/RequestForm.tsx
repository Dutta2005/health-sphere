import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { api } from "../../api/api";
import { State, City } from "country-state-city";
import { Plus } from "lucide-react";

interface FormData {
  bloodGroup: string;
  urgency: string;
  message?: string;
  phone: string;
  email?: string;
  state: string;
  district: string;
  city: string;
}

function RequestForm() {
  const [formData, setFormData] = useState<FormData>({
    bloodGroup: "",
    urgency: "",
    message: "",
    phone: "",
    email: "",
    state: "",
    district: "",
    city: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validation
      if (
        !formData.bloodGroup ||
        !formData.urgency ||
        !formData.phone ||
        !formData.state ||
        !formData.district ||
        !formData.city
      ) {
        setError("Please fill in all required fields.");
        return;
      }

      const response = await api.post("/blood-requests/create", {
        bloodGroup: formData.bloodGroup,
        urgency: formData.urgency,
        message: formData.message,
        contactDetails: {
          phone: formData.phone,
          email: formData.email,
        },
        status: "pending",
        address: {
          state: formData.state,
          district: formData.district,
          city: formData.city,
        },
      });

      if (response.status === 201) {
        console.log("Blood request created successfully");
        setError("");
        // Reset form after successful submission
        setFormData({
          bloodGroup: "",
          urgency: "",
          message: "",
          phone: "",
          email: "",
          state: "",
          district: "",
          city: "",
        });
      }
    } catch (error) {
      console.error("Error creating blood request:", error);
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="dark:bg-dark-bg dark:text-dark-text"><Plus /> Create a Request</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto dark:bg-dark-bg dark:text-dark-text">
        <DialogHeader>
          <DialogTitle>Request Form</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}

          {/* Blood Group */}
          <div>
            <Label htmlFor="bloodGroup">Blood Group *</Label>
            <Select
              onValueChange={(value) => handleChange("bloodGroup", value)}
              value={formData.bloodGroup}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Urgency */}
          <div>
            <Label htmlFor="urgency">Urgency *</Label>
            <Select
              onValueChange={(value) => handleChange("urgency", value)}
              value={formData.urgency}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                {["low", "medium", "high"].map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message</Label>
            <Input
              type="text"
              id="message"
              placeholder="Optional message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Address Fields in One Line */}
          <div className="flex flex-wrap gap-4">
            {/* State */}
            <div className="flex-1 min-w-[150px]">
              <Label htmlFor="state">State *</Label>
              <Select
                onValueChange={(value) => handleChange("state", value)}
                value={formData.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {State.getStatesOfCountry("IN").map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="flex-1 min-w-[150px]">
              <Label htmlFor="district">District *</Label>
              <Input
                type="text"
                id="district"
                value={formData.district}
                onChange={(e) => handleChange("district", e.target.value)}
                required
              />
            </div>

            {/* City */}
            <div className="flex-1 min-w-[150px]">
              <Label htmlFor="city">City *</Label>
              <Select
                onValueChange={(value) => handleChange("city", value)}
                value={formData.city}
                disabled={!formData.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {City.getCitiesOfState("IN", formData.state)?.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RequestForm;
