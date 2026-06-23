const accordionItems =
document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {

    const header =
    item.querySelector(".accordion-header");

    header.addEventListener("click", () => {

        accordionItems.forEach(other => {

            if(other !== item){
                other.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});