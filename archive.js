document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("archive-container");
    
    // remember to update this number every time a new edition is published
    const totalPublications = 1; 

    // Loop through publications
    for (let x = 1; x <= totalPublications; x++) {
        const pubFolder = `./archive/pub${x}`;
        const descPath = `${pubFolder}/desc.txt`;
        const repoLink = `https://github.com/your-username/your-repo/tree/main/archive/pub${x}`; // Replace with your repository link structure

        // Create section and internal elements
        const section = document.createElement("section");
        section.className = "publication-section";

        const h2 = document.createElement("h2");
        h2.textContent = `Publication ${x}`;

        const p = document.createElement("p");
        p.className = "description";
        p.textContent = "Loading description...";

        const button = document.createElement("a");
        button.href = repoLink;
        button.textContent = "View Repository";
        button.className = "repo-btn";
        button.target = "_blank";

        section.appendChild(h2);
        section.appendChild(p);
        section.appendChild(button);

        container.appendChild(section);

        // Fetch and load the desc.txt content
        try {
            const response = await fetch(descPath);
            if (response.ok) {
                const text = await response.text();
                p.textContent = text;
            } else {
                p.textContent = "Description unavailable.";
            }
        } catch (error) {
            console.error(`Could not load description for pub${x}:`, error);
            p.textContent = "Error loading description.";
        }
    }
});
