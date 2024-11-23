var typed = new Typed(".typing", {
    strings: ["Listen to Music", " Like Stanning Kpop", "Watch Drama","Like to Hang Out"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
const nav = document.querySelectorAll('.nav'),
      navlist = document.querySelectorAll('.nav li'), // Use querySelectorAll to select multiple list items
      totalNavList = navlist.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      removeBackSectionClass();
    for (let i = 0; i < totalNavList; i++) {
        const a = navlist[i].querySelector("a");
        a.addEventListener("click", function() {
            for (let j = 0; j < totalNavList; j++) {
                if (navlist[j].querySelector("a").classList.contains("active")) {
                    allSection[j].classList.add("back-section"); // Add back-section class if the link was active
                    navlist[j].querySelector("a").classList.remove("active"); // Remove active class
                }
            }
            this.classList.add("active");
            showSection(this);
            if (window.innerWidth < 1200) {
                asideSectionTogglerBtn();
            }
        });
    }    
function removeBackSectionClass() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num) {
    allSection[num].classList.add("back-section");
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1]; 
    console.log(target);
    document.querySelector("#" + target).classList.add("active");
}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navlist[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navlist[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navlist[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSectionClass()
    addBackSection(sectionIndex);
});
