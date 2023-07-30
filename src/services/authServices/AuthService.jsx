import {pb} from "../ConfigServices"

export const ListProviders = async () => {
    return await pb.collection('users').listAuthMethods();
}
export const RegisterUser = async (data) => {
    return await pb.collection('users').create(data);
}
export const AuthUsingEmail = async (email, password) => {
    return await pb.collection('users').authWithPassword(email, password);
}
export const AuthUsingOAuth = async (provider) => {
    return await pb.collection('users').authWithOAuth2({provider: provider});
}
export const EndSession = () => pb.authStore.clear();
