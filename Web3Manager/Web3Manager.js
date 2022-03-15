import { loginEarly } from "../hooks/useAuth";

export default function Web3ReactManager({ children }) {
    
    loginEarly();

    return children;
}