import { useForm } from 'react-hook-form';
import Field from './../common/Field';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const handleFormSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <Field label="Email" error={errors.email} htmlFor="email">
                <input
                    {...register('email', { required: 'Email is required' })}
                    className={`auth-input ${errors.email ? "border-red-500" : "border-gray-200"
                        }`}
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your email'
                />
            </Field>
            <Field label="Password" error={errors.password} htmlFor="password">
                <input
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long'
                        }
                    })}
                    className={`auth-input ${errors.password ? "border-red-500" : "border-gray-200"
                        }`}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter your password'
                />
            </Field>
            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
                    Login
                </button>
            </Field>
        </form>
    );
};

export default LoginForm;