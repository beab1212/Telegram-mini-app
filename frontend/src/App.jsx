import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

function App() {
    const isDarkMode = WebApp.colorScheme === "dark";

    const appStyle = {
        backgroundColor: isDarkMode ? "#222" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        padding: "20px",
        textAlign: "center",
    };

    useEffect(() => {
        WebApp.ready(); // Ensures the app is fully loaded
        WebApp.expand(); // Expands the app to full screen

        return () => {
            // WebApp.shrink(); // Shrinks the app to a smaller size
            // WebApp.close({ message: "Goodbye!" }); // Closes the app with a message
        };
    }, []);

    return (
        <div>
            <h1>Telegram Mini App</h1>
            <p>Color scheme: {isDarkMode ? "Dark" : "Light"}</p>
            <p>
                Welcome, {WebApp.initDataUnsafe?.user?.first_name || "Guest"}!
            </p>
        </div>
    );
}

export default App;
