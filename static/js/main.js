document.addEventListener("DOMContentLoaded", function () {
    //modal
    $(document).on("click", "[data-modal-btn]", function (e) {
        e.preventDefault();
        const hash = this.hash;
        modalOpen(hash);
    });
    $(document).on("click", "[data-modal-overlay], [data-modal-close]", function () {
        modalClose();
    });

    //tabs
    const tabsWrapper = document.querySelectorAll("[data-tabs-wrapper]");

    tabsWrapper.forEach((parent) => {
        const tabContents = parent.querySelectorAll("[data-tabs-content]");
        const tabButtons = parent.querySelectorAll("[data-tabs-btn]");

        tabButtons[0].classList.add("active");

        tabButtons.forEach((el, index) => {
            el.addEventListener("click", () => {
                for (let i = 0; i < tabContents.length; i++) {
                    tabButtons[i].classList.remove("active");
                    tabContents[i].style.display = "none";
                }
                el.classList.add("active");
                $(tabContents[index]).fadeIn();
            });
        });
    });

    //nice select2
    $(".select select").each(function (s) {
        if ($(this).parent().hasClass("select-search")) {
            NiceSelect.bind(this, { searchable: true });
        } else {
            NiceSelect.bind(this);
        }
    });

    //sliders
    if ($(".clients-slider").length) {
        const swiper = new Swiper(".clients-slider", {
            loop: true,
            speed: 3000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            slidesPerView: "auto",
            spaceBetween: 30,
        });
    }
    if ($(".main-slider").length) {
        const swiper = new Swiper(".main-slider", {
            loop: true,
            navigation: {
                nextEl: ".main-next",
                prevEl: ".main-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            slidesPerView: 1,
            autoHeight: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }

    //header
    $(document).on("click", ".header-burger", function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(".header-nav").fadeIn();
        } else {
            $(this).removeClass("active");
            $(".header-nav").fadeOut();
        }
    });

    //nav
    $(document).on("click", ".doc-nav .menu-item-has-children > a", function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("open");
    });
});

//modals
function modalOpen(hash) {
    if ($("[data-modal]").hasClass("modal-open")) {
        modalClose();
        setTimeout(() => {
            $(hash).fadeIn();
            $(hash).addClass("modal-open");
        }, 100);
    } else {
        $(hash).fadeIn();
        $(hash).addClass("modal-open");
    }
}

function modalClose() {
    const modalOpen = $("[data-modal].modal-open");
    modalOpen.fadeOut();
    modalOpen.removeClass("modal-open");
}
