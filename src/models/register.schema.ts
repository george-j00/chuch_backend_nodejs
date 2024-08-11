import mongoose, { Schema } from "mongoose"

interface Register {
  name: string
  link: string
}

const registerSchema = new Schema<Register>({
  name: { type: String, required: true },
  link: { type: String, required: true },
})

const RegisterModel = mongoose.model<Register>("Register", registerSchema)

export default RegisterModel
