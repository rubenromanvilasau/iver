import { Button, Card, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserService } from "../../services";
const userService = new UserService();


export const RecoverPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState({ status: false, message: '' });
    const [newPassword, setNewPassword] = useState('');

    const onChangeConfirmPassword = (e) => {
        if( e.target.value !== newPassword ) {
            setError({ status: true, message: 'Passwords do not match' });
        }else{
            setError({ status: false, message: '' });
        }
    }

    useEffect(() => {
        console.log('token', searchParams.get('token'));
        console.log('email', searchParams.get('email'));

        const email = searchParams.get('email');
        const token = searchParams.get('token');

        // if( !email || !token ) navigate('/404');

        userService.getByEmail( email ).then( response => {
            console.log('response', response.data);
        }).catch( err => {
            console.log('err', err);
            navigate('/404');
            throw Error('User not found');
        });
    }, []);

    return (
        <div className="container mx-auto my-auto p-4 w-full md:p-8 md:w-1/2 lg:w-1/3">
            <Card>
                <h1 className="text-xl text-slate-600">Time to create your new password</h1>
                <TextInput
                    label="New password"
                    placeholder="Enter your new password"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextInput
                    label="Confirm new password"
                    placeholder="Confirm your new password"
                    type="password"
                    onChange={onChangeConfirmPassword}
                />
                { error.status && <p className="text-red-500">{ error.message }</p> }
                <div className="flex justify-end w-full">
                    <Button
                        className="bg-primary"
                    >
                        Save
                    </Button>
                </div>
            </Card>
        </div>
    )
};