const button = document.getElementById("apiButton");
const responseElement = document.getElementById("apiResponse");

button.addEventListener("click", async () => {

    try {

        const response = await fetch("/api/health");

        const data = await response.json();

        responseElement.textContent =
            `Backend status: ${data.status}`;

    } catch (error) {

        responseElement.textContent =
            "Unable to contact backend.";

        console.error(error);
    }

});
