// Finds the button that opens and closes the mobile navigation menu.
const menuButton = document.querySelector(".menu-button");

// Finds the main navigation area that will be shown or hidden on small screens.
const mainNavigation = document.querySelector(".main-navigation");

// Checks that both navigation elements exist before adding menu controls.
if (menuButton && mainNavigation) {
    // Watches the menu button for a click from the visitor.
    menuButton.addEventListener("click", function () {
        // Adds or removes the is-open class and stores whether the menu is now open.
        const menuIsOpen = mainNavigation.classList.toggle("is-open");

        // Updates the accessibility value so screen readers know the menu state.
        menuButton.setAttribute("aria-expanded", String(menuIsOpen));

        // Shows Close menu when open and Menu when closed.
        menuButton.textContent = menuIsOpen ? "Close menu" : "Menu";
    // Ends the function that runs when the menu button is clicked.
    });

    // Finds every page link inside the main navigation.
    const navigationLinks = mainNavigation.querySelectorAll("a");

    // Repeats the next instructions for each navigation link.
    navigationLinks.forEach(function (link) {
        // Watches the current navigation link for a click.
        link.addEventListener("click", function () {
            // Removes the is-open class so the mobile menu closes after a selection.
            mainNavigation.classList.remove("is-open");

            // Changes the accessibility value back to false because the menu is closed.
            menuButton.setAttribute("aria-expanded", "false");

            // Restores the normal Menu text on the button.
            menuButton.textContent = "Menu";
        // Ends the function that runs when a navigation link is clicked.
        });
    // Ends the loop that adds a click event to each navigation link.
    });
// Ends the mobile navigation setup block.
}

// Finds every category-filter button on the Events page.
const filterButtons = document.querySelectorAll(".filter-button");

// Finds every event card that can be shown or hidden.
const eventCards = document.querySelectorAll(".event-card");

// Finds the paragraph that reports how many events are being displayed.
const eventResultMessage = document.querySelector("#event-results-message");

// Runs the filtering code only when filter buttons and event cards are present.
if (filterButtons.length > 0 && eventCards.length > 0) {
    // Repeats the next instructions for each filter button.
    filterButtons.forEach(function (button) {
        // Watches the current filter button for a click.
        button.addEventListener("click", function () {
            // Reads the category stored in the clicked button's data-filter attribute.
            const selectedCategory = button.dataset.filter;

            // Starts the visible event counter at zero for each new filter choice.
            let visibleEventCount = 0;

            // Repeats the next instructions for every filter button.
            filterButtons.forEach(function (otherButton) {
                // Removes the active appearance from all filter buttons.
                otherButton.classList.remove("is-active");

                // Tells assistive technology that this button is not selected.
                otherButton.setAttribute("aria-pressed", "false");
            // Ends the loop that resets every filter button.
            });

            // Adds the active appearance to the button that was clicked.
            button.classList.add("is-active");

            // Tells assistive technology that the clicked button is selected.
            button.setAttribute("aria-pressed", "true");

            // Repeats the next instructions for every event card.
            eventCards.forEach(function (card) {
                // Reads the category stored in the current card's data-category attribute.
                const cardCategory = card.dataset.category;

                // Begins a true-or-false check that decides whether this card should appear.
                const shouldShow =
                    // Returns true when the visitor selected the All Events filter.
                    selectedCategory === "all" ||
                    // Also returns true when the button category matches the card category.
                    selectedCategory === cardCategory;

                // Hides the card when shouldShow is false and shows it when shouldShow is true.
                card.hidden = !shouldShow;

                // Checks whether the current card is visible after filtering.
                if (shouldShow) {
                    // Adds one to the number of visible event cards.
                    visibleEventCount += 1;
                // Ends the visible-card check.
                }
            // Ends the loop that checks every event card.
            });

            // Checks that the results paragraph exists before changing its text.
            if (eventResultMessage) {
                // Begins the choice of a readable category name for the results message.
                const categoryName =
                    // Checks whether the selected category is all.
                    selectedCategory === "all"
                        // Uses these words when the All Events button was selected.
                        ? "all categories"
                        // Otherwise uses the category name stored on the clicked button.
                        : selectedCategory;

                // Begins building the sentence that reports the filter result.
                eventResultMessage.textContent =
                    // Adds the number of event cards currently visible.
                    visibleEventCount +
                    // Adds the word event after the number.
                    " event" +
                    // Adds the letter s only when the number is not one.
                    (visibleEventCount === 1 ? "" : "s") +
                    // Adds the connecting words before the category name.
                    " shown for " +
                    // Adds the readable category name selected above.
                    categoryName +
                    // Finishes the sentence with a full stop.
                    ".";
            // Ends the check for the event results paragraph.
            }
        // Ends the function that runs when a filter button is clicked.
        });
    // Ends the loop that prepares every filter button.
    });
// Ends the Events page filtering setup block.
}

// Finds the contact form on the Contact page.
const contactForm = document.querySelector("#contact-form");

// Runs the validation setup only when the contact form is present.
if (contactForm) {
    // Finds the Full Name field and stores it for later checks.
    const fullName = document.querySelector("#full-name");

    // Finds the Email Address field and stores it for later checks.
    const emailAddress = document.querySelector("#email-address");

    // Finds the Subject drop-down list and stores it for later checks.
    const subject = document.querySelector("#subject");

    // Finds the Message box and stores it for later checks.
    const message = document.querySelector("#message");

    // Finds the area used to display the overall form result.
    const formMessage = document.querySelector("#form-message");

    // Watches the form for an attempt to submit it.
    contactForm.addEventListener("submit", function (event) {
        // Stops the browser from refreshing or sending the form automatically.
        event.preventDefault();

        // Removes error messages left from an earlier submission attempt.
        clearFormErrors();

        // Assumes the form is valid until one of the checks fails.
        let formIsValid = true;

        // Checks whether the cleaned Full Name value has fewer than three characters.
        if (fullName.value.trim().length < 3) {
            // Starts the function call that displays a Full Name error.
            showFieldError(
                // Sends the Full Name field to the error function.
                fullName,
                // Sends the message that should appear below the Full Name field.
                "Please enter your full name using at least three characters."
            // Ends the Full Name error function call.
            );

            // Records that the form contains an invalid value.
            formIsValid = false;
        // Ends the Full Name validation check.
        }

        // Checks whether the cleaned email value fails the email pattern test.
        if (!emailIsValid(emailAddress.value.trim())) {
            // Starts the function call that displays an Email Address error.
            showFieldError(
                // Sends the Email Address field to the error function.
                emailAddress,
                // Sends the message that should appear below the Email Address field.
                "Please enter a valid email address, for example name@email.com."
            // Ends the Email Address error function call.
            );

            // Records that the form contains an invalid value.
            formIsValid = false;
        // Ends the Email Address validation check.
        }

        // Checks whether the visitor left the Subject drop-down on its empty option.
        if (subject.value === "") {
            // Starts the function call that displays a Subject error.
            showFieldError(
                // Sends the Subject field to the error function.
                subject,
                // Sends the message that should appear below the Subject field.
                "Please select the main reason for contacting JCDA."
            // Ends the Subject error function call.
            );

            // Records that the form contains an invalid value.
            formIsValid = false;
        // Ends the Subject validation check.
        }

        // Checks whether the cleaned Message value has fewer than twenty characters.
        if (message.value.trim().length < 20) {
            // Starts the function call that displays a Message error.
            showFieldError(
                // Sends the Message field to the error function.
                message,
                // Sends the message that should appear below the Message field.
                "Please provide at least 20 characters so we can understand your request."
            // Ends the Message error function call.
            );

            // Records that the form contains an invalid value.
            formIsValid = false;
        // Ends the Message validation check.
        }

        // Checks whether any field failed its validation test.
        if (!formIsValid) {
            // Starts the function call that displays the overall error message.
            showFormMessage(
                // Supplies the sentence shown above the form after a failed attempt.
                "Please correct the highlighted fields before sending the form.",
                // Supplies the error class name used by the stylesheet.
                "error"
            // Ends the overall error message function call.
            );

            // Starts searching for the first field marked as invalid.
            const firstInvalidField = contactForm.querySelector(
                // Selects the first form field whose aria-invalid value is true.
                '[aria-invalid="true"]'
            // Ends the search for the first invalid field.
            );

            // Checks whether an invalid field was found.
            if (firstInvalidField) {
                // Moves the keyboard cursor to that field so it can be corrected quickly.
                firstInvalidField.focus();
            // Ends the invalid-field focus check.
            }

            // Stops the submit function so the success instructions do not run.
            return;
        // Ends the failed-validation block.
        }

        // Starts the function call that displays the successful validation message.
        showFormMessage(
            // Begins the message with a thank-you greeting.
            "Thank you, " +
                // Adds the cleaned Full Name entered by the visitor.
                fullName.value.trim() +
                // Finishes the message and explains how to contact JCDA directly.
                ". Your information has passed the form checks. Please use the listed email address or telephone number to contact JCDA directly.",
            // Supplies the success class name used by the stylesheet.
            "success"
        // Ends the successful validation message function call.
        );

        // Clears the values from every contact-form field.
        contactForm.reset();
    // Ends the function that runs when the contact form is submitted.
    });

    // Creates a list of fields and repeats the next instructions for each one.
    [fullName, emailAddress, subject, message].forEach(function (field) {
        // Watches the current field while the visitor types or edits its value.
        field.addEventListener("input", function () {
            // Removes the field's warning as soon as its value is changed.
            clearFieldError(field);
        // Ends the function that runs when input is detected.
        });

        // Watches the current field when the visitor completes a selection or change.
        field.addEventListener("change", function () {
            // Removes the field's warning after a completed change.
            clearFieldError(field);
        // Ends the function that runs when a change is detected.
        });
    // Ends the loop that prepares the four form fields.
    });

    // Creates a reusable function that checks the format of an email address.
    function emailIsValid(email) {
        // Stores a pattern that requires text, an @ sign, a domain and a final extension.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        // Returns true when the email matches the pattern and false when it does not.
        return emailPattern.test(email);
    // Ends the emailIsValid function.
    }

    // Creates a reusable function that marks one form field as invalid.
    function showFieldError(field, errorText) {
        // Starts searching for the error paragraph connected to the field.
        const errorElement = document.querySelector(
            // Builds the error paragraph ID from the field's own ID.
            "#" + field.id + "-error"
        // Ends the search for the field's error paragraph.
        );

        // Marks the field as invalid for styling and assistive technology.
        field.setAttribute("aria-invalid", "true");

        // Checks whether the matching error paragraph was found.
        if (errorElement) {
            // Places the supplied error message inside that paragraph.
            errorElement.textContent = errorText;
        // Ends the error-paragraph check.
        }
    // Ends the showFieldError function.
    }

    // Creates a reusable function that clears one field's invalid state.
    function clearFieldError(field) {
        // Starts searching for the error paragraph connected to the field.
        const errorElement = document.querySelector(
            // Builds the error paragraph ID from the field's own ID.
            "#" + field.id + "-error"
        // Ends the search for the field's error paragraph.
        );

        // Marks the field as valid again for styling and assistive technology.
        field.setAttribute("aria-invalid", "false");

        // Checks whether the matching error paragraph was found.
        if (errorElement) {
            // Removes any error message currently shown in that paragraph.
            errorElement.textContent = "";
        // Ends the error-paragraph check.
        }
    // Ends the clearFieldError function.
    }

    // Creates a reusable function that clears all earlier form errors.
    function clearFormErrors() {
        // Creates a list of fields and repeats the clearing step for each one.
        [fullName, emailAddress, subject, message].forEach(function (field) {
            // Uses the helper function to clear the current field's error.
            clearFieldError(field);
        // Ends the loop that clears all four fields.
        });

        // Checks whether the overall form-message area exists.
        if (formMessage) {
            // Returns the message area to its normal base CSS class.
            formMessage.className = "form-message";

            // Removes any overall form message left from an earlier attempt.
            formMessage.textContent = "";
        // Ends the form-message area check.
        }
    // Ends the clearFormErrors function.
    }

    // Creates a reusable function that displays an overall form message.
    function showFormMessage(text, messageType) {
        // Checks whether the form-message area is missing.
        if (!formMessage) {
            // Stops the function because there is nowhere to display the message.
            return;
        // Ends the missing-message-area check.
        }

        // Places the supplied sentence inside the form-message area.
        formMessage.textContent = text;

        // Begins setting the classes that make the message visible and styled.
        formMessage.className =
            // Combines the base classes with either the error or success class.
            "form-message is-visible " + messageType;
    // Ends the showFormMessage function.
    }
// Ends the Contact page validation setup block.
}
