document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("archive-container");
    // Remember to update this number every time a new edition is published
    const totalPublications = 2;
    const repopath = "https://innacuracy.github.io/leofnet";

    // Loop through publications
    for (let x = 1; x <= totalPublications; x++) {
        const pubFolder = `/archive/pub${x}`;
        const descPath = `.${pubFolder}/desc.txt`;

        // Create section and internal elements
        const section = document.createElement("section");
        section.className = "publication-section";

        const h2 = document.createElement("h2");
        h2.textContent = `Publication ${x}`;

        const p = document.createElement("p");
        p.className = "description";
        p.textContent = "Loading description...";

        // will use lines to pull data abt. publication (loading right number of items, item titles)
        let lines = [];
        let numitm = null;
        try {
            const response = await fetch(descPath);
            if (response.ok) {
                const text = await response.text();
                lines = text.split(/\r?\n/);
                p.textContent = lines[0];
                numitm = parseInt(lines[1], 10);
            } else {
                p.textContent = "Description unavailable.";
            }
        } catch (error) {
            console.error(`Could not load description for pub${x}:`, error);
            p.textContent = "Error loading description.";
        }

        // Append base section elements first
        section.appendChild(h2);
        section.appendChild(p);
        // Loop to create buttons
        for (let j = 1; j <= numitm; j++) {
            const button = document.createElement("a");
            const itmlink = `itm${j}.html`;
            const fullLink = `.${pubFolder}/${itmlink}`;
            button.href = `${fullLink}`;
            
            // Use fallback text if lines failed to fetch
            button.textContent = lines[j + 2] || `Item ${j}`;
            button.className = "repo-btn";
            button.target = "_blank";

            section.appendChild(button);
            const br = document.createElement("br");
            section.appendChild(br);
        }

        // Finally, append the fully constructed section to the container once
        container.appendChild(section);
    }
});
