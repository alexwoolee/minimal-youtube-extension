function injectLogo() {
    const mainContent = document.getElementById("contents");
    if (!mainContent || document.getElementById("hero")) {
        return;
    }

    const hero = document.createElement("div");
    hero.id = "hero";
    Object.assign(hero.style, {
        width: "100%",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-60vh",
    });

    const logo = document.createElement("img");
    logo.src = chrome.runtime.getURL("images/hero-icon.webp");
    logo.style.width = "128px";

    mainContent.prepend(hero);
    hero.append(logo);
}

let debounceTimer; // Holds a reference to the pending timer

const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(injectLogo, 200);
});
observer.observe(document.body, {
    subtree: true,
    childList: true,
});
injectLogo();
