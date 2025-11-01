import bcrypt from 'bcryptjs';
import { getDB } from '../../db/connection';
import { IUserBase, IUser } from '../models/User';
import { signToken } from '../utils/jwt';


export class AuthService {

    private userCollection = () => getDB().collection<IUser>('users')

    async register(userData: any) {
        try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser: IUser = {
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            role: userData.role,
            favorites: []
        };

        await this.userCollection().insertOne(newUser);
        return newUser;
    } catch (error) {
        throw new Error('Erreur lors de l\'inscription de l\'utilisateur');
    }
    }

    async login(email: string, password: string): Promise<string | null> {
        try {
        const user = await this.userCollection().findOne( {email});

        if (user && await bcrypt.compare(password, user.password)) {
            const payload : IUserBase = { id: user._id?.toString() , email: user.email, role: user.role };
            return signToken(payload);
        }
        return null;
    } catch (error) {
        throw new Error('Erreur lors de la connexion de l\'utilisateur');
    }
}


}
