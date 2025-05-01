export const renderContent = (data) => {
    // Ensure the data is an array and exists
    if (!Array.isArray(data)) {
        console.warn("Expected an array of content data.");
        return "";
    }

    return data
        .map((item) => {
            if (item.type === "paragraph") {
                // If the type is paragraph, render children as nested content
                return `<p>${renderContent(item.children)}</p>`;
            } else if (item.type === "text") {
                // If it's text, handle bold elements
                let text = item.text || "";
                if (item.bold) {
                    text = `<strong>${text}</strong>`;
                }
                return text;
            }
            // If the item type is unknown, return empty string (could also throw error or handle other types)
            return "";
        })
        .join(""); // Join everything into a single string
};
