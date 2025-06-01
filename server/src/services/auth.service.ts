import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { registerSchema, RegisterInput, LoginInput, loginSchema } from '../validations/user.validation';

/**
 * Service to register a new user.
 * @param input - The registration input containing username, email, and password.
 * @returns A promise that resolves to an object indicating success or failure.
 */
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

/**
 * Service to login a user.
 * @param input - The login input containing email and password.
 * @returns A promise that resolves to an object indicating success or failure.
 */
export const loginUserService = async (input: LoginInput) => {

    // Validate input
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
        return {
            success: false,
            status: 400,
            error: parsed.error.flatten().fieldErrors,
        };
    }

    // destructuring email and password from parsed data
    const { email, password } = parsed.data;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return {
            success: false,
            status: 404,
            message: 'User not found',
        };
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return {
            success: false,
            status: 401,
            message: 'Invalid password',
        };
    }

    // Generate JWT
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    // Return success response with token
    return {
        success: true,
        status: 200,
        message: 'Login successful',
        token,
    };

};

