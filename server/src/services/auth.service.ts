import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { registerSchema, RegisterInput } from '../validations/user.validation';

export const registerUserService = async (input: RegisterInput) => {
    // Validate input
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
        return {
            success: false,
            status: 400,
            error: parsed.error.flatten().fieldErrors,
        };
    }

    const { username, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {
            success: false,
            status: 409,
            message: 'Email already registered',
        };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    return {
        success: true,
        status: 201,
        message: 'User registered successfully',
    };
};
