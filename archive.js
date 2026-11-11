async function getFolderItemCount(folderPath) {
  const url = `https://github.com/Innacuracy/leofnet/tree/main/${folderPath}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    
    const items = await response.json();
    const totalItems = items.length; 
    
    console.log(`Total items: ${totalItems}`);
    return totalItems;
  } catch (error) {
    console.error('Failed to fetch folder contents:', error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("archive-container");
    
    // remember to update this number every time a new edition is published
    const totalPublications = getFolderItemcount("archive")

    // Loop through publications
    for (let x = 1; x <= totalPublications; x++) {
        const pubFolder = `./archive/pub${x}`;
        const descPath = `${pubFolder}/desc.txt`;

        // Create section and internal elements
        const section = document.createElement("section");
        section.className = "publication-section";

        const h2 = document.createElement("h2");
        h2.textContent = `Publication ${x}`;

        const p = document.createElement("p");
        p.className = "description";
        p.textContent = "Loading description...";
        for (let j = 1; x <= getFolderItemcount(`archive/pub${x}`)) {

            const button = document.createElement("a");
            itmlink = `/itm${j}.html`;
            fullLink = `${pubFolder}/${itmlink}`;
            button.href = fullLink;
            button.textContent = fullLink.document.querySelector('h1').text();
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
