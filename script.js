const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".card");
const surpriseButton = document.querySelector("#surprise");
const message = document.querySelector("#message");

const instructions = document.querySelector("#instructions");
const activityTitle = document.querySelector("#activity-title");
const activityMaterials = document.querySelector("#activity-materials");
const activitySteps = document.querySelector("#activity-steps");

const activities = {
  "Invent an Animal": {
    materials: "Paper, pencils, and crayons.",
    steps: [
      "Choose two animals you like.",
      "Combine their features into one imaginary animal.",
      "Draw and color your creature.",
      "Give it a name and decide where it lives."
    ]
  },

  "Paper Flower Garden": {
    materials: "Colored paper, glue, and child-safe scissors.",
    steps: [
      "Draw flowers on colored paper.",
      "Ask an adult to help cut them out.",
      "Make paper stems and leaves.",
      "Glue your flowers onto a page."
    ]
  },

  "Build a Tiny Town": {
    materials: "Small cardboard boxes, paper, markers, and tape.",
    steps: [
      "Collect empty boxes.",
      "Draw windows and doors on them.",
      "Arrange the boxes into a town.",
      "Add paper roads and signs."
    ]
  },

  "The Secret Door": {
    materials: "Paper and a pencil.",
    steps: [
      "Imagine a tiny door behind your bookshelf.",
      "Describe the door.",
      "Imagine what is on the other side.",
      "Write your adventure and draw a picture."
    ]
  },

  "Nature Rubbings": {
    materials: "A fallen leaf, paper, and crayons.",
    steps: [
      "Find a fallen leaf.",
      "Place it under a sheet of paper.",
      "Rub the side of a crayon over the paper.",
      "Try different leaves and colors."
    ]
  },

  "Create a Paper Crown": {
    materials: "Paper, crayons, stickers, and tape.",
    steps: [
      "Ask an adult to help make a paper strip.",
      "Decorate it with drawings and stickers.",
      "Ask an adult to tape it into a crown.",
      "Wear it and invent a royal name!"
    ]
  }
};

// Display instructions in the popup.
function openInstructions(card) {
  const title = card.querySelector("h3").textContent.trim();
  const activity = activities[title];

  if (!activity) {
    return;
  }

  activityTitle.textContent = title;
  activityMaterials.textContent = "You will need: " + activity.materials;
  activitySteps.replaceChildren();

  activity.steps.forEach(function(step) {
    const item = document.createElement("li");
    item.textContent = step;
    activitySteps.appendChild(item);
  });

  instructions.showModal();
}

// Create a button for each activity.
cards.forEach(function(card) {
  const button = document.createElement("button");

  button.textContent = "View Instructions";
  button.classList.add("instructions-button");

  button.addEventListener("click", function() {
    openInstructions(card);
  });

  card.querySelector(".card-text").appendChild(button);
});

// Make the category buttons work.
filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const category = button.dataset.filter;

    cards.forEach(function(card) {
      card.hidden =
        category !== "all" && card.dataset.category !== category;
    });

    filterButtons.forEach(function(filterButton) {
      const selected = filterButton === button;

      filterButton.classList.toggle("active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });

    message.textContent = "";
  });
});

// Open a random activity.
surpriseButton.addEventListener("click", function() {
  const visibleCards = Array.from(cards).filter(function(card) {
    return !card.hidden;
  });

  if (visibleCards.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * visibleCards.length);
  openInstructions(visibleCards[randomIndex]);
});