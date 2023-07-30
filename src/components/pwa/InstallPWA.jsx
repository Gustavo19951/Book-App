import React, {useEffect, useState} from "react";
import {Apps24Filled} from '@fluentui/react-icons';
import {Button} from "@fluentui/react-components";
import {FormattedMessage} from "react-intl";

const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };

    if (window.matchMedia('(display-mode: standalone)').matches) {
        return null;
    }

    if(supportsPWA){
        return (
            <Button
                appearance="primary"
                icon={<Apps24Filled/>}
                onClick={onClick}>
                <FormattedMessage id="app.pwa" defaultMessage="Install APP"/>
            </Button>
        );
    }

};

export default InstallPWA;