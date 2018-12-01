// Файл setup.js
'use strict';
var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomFullName = function () {
  return WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_LASTNAMES[Math.floor(Math.random() * WIZARD_LASTNAMES.length)];
};

var getRandomCoatColor = function () {
  return COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
};

var getRandomEyesColor = function () {
  return EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
};

var getRandomFireballColor = function () {
  return FIREBALL_COLORS[Math.floor(Math.random() * FIREBALL_COLORS.length)];
};

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var generateWizard = function () {
  return {
    name: getRandomFullName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor()
  };
};

var wizards = [];
for (var i = 0; i <= WIZARD_COUNT; i++) {
  wizards[i] = generateWizard();
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var buttonSubmit = document.querySelector('.setup-submit');

// закрытие окна по клику мыши
userDialogOpen.addEventListener('click', function () {
  userDialog.classList.remove('hidden');
  // закрытие окна после нажатия на ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (evt.target !== userNameInput) {
        userDialog.classList.add('hidden');
      }
    }
  });
});

// отправка формы только после нажатия на ENTER
buttonSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode !== 13) {
    evt.preventDefault();
  }
});

// открытие окна после нажатия ENTER на юзерпик
userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    userDialog.classList.remove('hidden');
  }
});

// закрытие окна после нажатия на крестик
userDialogClose.addEventListener('click', function () {
  userDialog.classList.add('hidden');
});

// закрытие окна после нажатия на enter при фокусе на крестик
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    userDialog.classList.add('hidden');
  }
});

// валидация вводимого имени
userNameInput.addEventListener('Invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно первышать 25-ти символов');
  } else {
    userNameInput.setCustomValidity('');
  }
});
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х симолов');
  } else {
    target.setCustomValidity('');
  }
});

// изменение цвета накидки персонажа по клику мыши
var userWizardCoat = document.querySelector('.wizard-coat');
var userWizardCoatInput = document.getElementsByName('.coat-color');

userWizardCoat.addEventListener('click', function () {
  var coatColor = getRandomCoatColor();
  userWizardCoat.style = 'fill: ' + coatColor;
  userWizardCoatInput.value = coatColor;
});

// изменение цвета глаз персонажа по клику мыши
var userWizardEyes = document.querySelector('.wizard-eyes');
var userWizardEyesInput = document.getElementsByName('eyes-color');

userWizardEyes.addEventListener('click', function () {
  var eyesColor = getRandomFireballColor();
  userWizardEyes.style = 'fill: ' + eyesColor;
  userWizardEyesInput.value = eyesColor;
});

// изменение цвета файрбола персонажа по клику мыши
var userWizardFireball = document.querySelector('.setup-fireball-wrap');
var userWizardFireballInput = document.getElementsByName('fireball-color');

userWizardFireball.addEventListener('click', function () {
  var fireballColor = getRandomFireballColor();
  userWizardFireball.style = 'background-color: ' + fireballColor;
  userWizardFireballInput.value = fireballColor;
});

