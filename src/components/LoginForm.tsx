"use client";

export default function LoginForm() {
    return (
        <form className="p-4 bg-white rounded-sm shadow-lg">
            <h1 className="text-2xl text-center">Vehicle Maintenance Log</h1>
            <hr className="my-4" />
            <section className="flex flex-col gap-3">
                <input
                    type="text"
                    className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                    placeholder="Username"
                />
                <input
                    type="password"
                    className="py-2 pl-4 transition-colors bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:text-black"
                    placeholder="Password"
                />
                <button className="py-2 text-white transition-colors duration-500 bg-cyan-800 hover:bg-cyan-600">
                    Login
                </button>
            </section>
            <hr className="my-4" />
            <footer>Dont have a login? Contact Robert Teets.</footer>
        </form>
    );
}
