import {useContext, useEffect, useId, useState} from "react";
import {Button, Image, Input, Label, makeStyles, tokens} from "@fluentui/react-components";
import {Fingerprint24Regular, LockOpen24Regular, Mail24Regular, PersonRegular} from "@fluentui/react-icons";
import {AuthUsingOAuth, ListProviders, RegisterUser} from "../../services/authServices/AuthService.jsx";
import {Spinner} from "@fluentui/react";
import {Alert} from "@fluentui/react-components/unstable";
import {authContext} from "../../contexts/AuthContext.jsx";
import google from "/src/assets/svg/google.svg"

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        rowGap: tokens.spacingVerticalMNudge
    },
    formElement: {
        minWidth: "100%",
    },
    error: {
        backgroundColor: tokens.colorPaletteRedBackground2
    }
});

const FormRegister = ({closeForm}) => {
    const classes = useStyles();
    const id = useId();

    const auth = useContext(authContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [providers, setProviders] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(undefined);
        const data = {
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": confirmPassword,
            "name": name
        };

        const authPromise = RegisterUser(data);
        registerAuth(authPromise);
    }
    const handleAuthProvider = (provider) => {
        setError(undefined);
        const authPromise = AuthUsingOAuth(provider);
        registerAuth(authPromise);
    }
    const registerAuth = (authPromise) => {
        setLoading(true);
        setError(undefined);
        authPromise.then((res) => {
            auth.setAuthDataContext(res);
            closeForm();
        });
        authPromise.catch((res) => {
            setError(res.message);

        });
        authPromise.finally(() => {
            setLoading(false);
        });
    }


    useEffect(() => {
        const promise = ListProviders();
        promise.then(({authProviders}) => setProviders(authProviders));
    }, []);


    if (loading) {
        return <Spinner/>;
    }


    return (
        <form action="" className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
            {error &&
                <Alert intent="error" action="" classNmae={classes.error}>
                    {error}
                </Alert>
            }
            <div>
                <Label htmlFor={id + "Name"}>Name:</Label>
                <Input className={classes.formElement}
                       contentBefore={<PersonRegular/>}
                       id={id + "Name"}
                       type="text"
                       size="large"
                       placeholder="Xxxxxx Xxxxxx"
                       appearance="filled-darker"
                       onChange={(_, data) => {
                           setName(data.value)
                       }}
                       required
                />
            </div>
            <div>
                <Label htmlFor={id + "Email"}>Email:</Label>
                <Input className={classes.formElement}
                       contentBefore={<Mail24Regular/>}
                       id={id + "Email"}
                       type="email"
                       size="large"
                       placeholder="xxxxx@xxxxx.xxx"
                       appearance="filled-darker"
                       onChange={(_, data) => {
                           setEmail(data.value)
                       }}
                       required
                />
            </div>
            <div>
                <Label htmlFor={id + "Password"}>Password:</Label>
                <Input className={classes.formElement}
                       contentBefore={<Fingerprint24Regular/>}
                       id={id + "Password"}
                       type="password"
                       size="large"
                       appearance="filled-darker"
                       onChange={(_, data) => {
                           setPassword(data.value)
                       }}
                       required
                />
            </div>
            <div>
                <Label htmlFor={id + "ConfirmPassword"}>Confirm Password:</Label>
                <Input className={classes.formElement}
                       contentBefore={<Fingerprint24Regular/>}
                       id={id + "ConfirmPassword"}
                       type="password"
                       size="large"
                       appearance="filled-darker"
                       onChange={(_, data) => {
                           setConfirmPassword(data.value)
                       }}
                       required
                />
            </div>
            <Button type="submit" icon={<LockOpen24Regular/>} appearance="primary">Register</Button>
            {providers.map(({name}) =>
                <Button key={name}
                        type="button"
                        icon={<Image src={google} width={24} height={24} alt="Auth using"/>}
                        onClick={() => {
                            handleAuthProvider(name)
                        }}>
                    Register Using {name}
                </Button>
            )}
        </form>
    )
}

export default FormRegister;