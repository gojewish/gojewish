function switchTab() {
    var labels = document.querySelectorAll('#donations_form > label');

    var e = document.getElementsByClassName("project-select")[0]
    var el = e.options[e.selectedIndex];

    var oneTime = el.getAttribute("data-one-time");
    var reccurring = el.getAttribute("data-recurring");

    var visibleLabel = 'position:relative!important;top:0px!important;margin-right:5px!important;margin-bottom:-1px!important;padding:12px 20px!important;font-weight:600!important;font-size:14px!important;line-height:18px!important;height:18px!important;text-align:center!important;border-left-width:1px!important;border-left-style:solid!important;border-left-color:#C6C6C6!important;border-right-width:1px!important;border-right-style:solid!important;border-right-color:#C6C6C6!important;border-top-width:1px!important;border-top-style:solid!important;border-top-color:#C6C6C6!important;border-top-left-radius:10px!important;border-top-right-radius:10px!important;background-color:white!important;background:-moz-linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;background: -webkit-linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;background: linear-gradient(0deg, white 0%, white 90%, #f4ebb9 90%, #f4ebb9 100%)!important;float: none!important;box-sizing: content-box!important;display: inline-block!important;';
    var visibleLabelNotActive = 'position:relative!important;top:1px!important;margin-right:5px!important;margin-bottom: 0px!important;padding:12px 20px!important;font-weight:600!important;font-size:14px!important;line-height:14px!important;height:14px!important;text-align:center!important;border-left-width:1px!important;border-left-style:solid!important;border-left-color:#C6C6C6!important;border-right-width:1px!important;border-right-style:solid!important;border-right-color:#C6C6C6!important;border-top-width:1px!important;border-top-style:solid!important;border-top-color:#C6C6C6!important;border-top-left-radius:10px!important;border-top-right-radius:10px!important;background-color:#E3E3E3!important;background-image:none!important;background-repeat:repeat!important;background-position:top left!important;background-attachment:scroll!important;float: none!important;box-sizing: content-box!important;display:inline-block!important';

    if (oneTime != null && reccurring != null) {
        for (var i = 0; i < labels.length; i++) {
            var label = labels[i];
            var tabContent = document.getElementById(label.htmlFor + '_content');
            if (document.getElementById(label.htmlFor).checked) {
                label.style = visibleLabel;
                showElement(tabContent, 'block')
            } else {
                label.style = visibleLabelNotActive;
                hideElement(tabContent)
            }
        }
    } else {
        hideTabs(oneTime, visibleLabel);
    }
}

function hideTabs(oneTime, visibleLabel) {
    if (oneTime == null) {
        document.getElementById("mkdf.recurring").style = visibleLabel
        showElement(document.getElementById("donations_tabs_2_content"), 'block')
        hideElement(document.getElementById("mkdf.one.time"))
        hideElement(document.getElementById("donations_tabs_1_content"))
    } else {
        document.getElementById("mkdf.one.time").style = visibleLabel;
        showElement(document.getElementById("donations_tabs_1_content"), 'block')
        hideElement(document.getElementById("mkdf.recurring"))
        hideElement(document.getElementById("donations_tabs_2_content"))
    }
}

document.addEventListener("DOMContentLoaded", function () {
    switchTab();
});

function hideElement(element) {
    element.style.setProperty('display', 'none', 'important');
}

function showElement(element, blockVariation) {
    element.style.setProperty('display', blockVariation, 'important');
}

function setAmountBorder(el, checked) {
    if (checked) {
        el.style.setProperty('border', '4px solid #F7D728', 'important');
        el.style.setProperty('padding', '5px 7px', 'important');
    } else {
        el.style.setProperty('border', '1px solid #C6C6C6', 'important');
        el.style.setProperty('padding', '8px 10px', 'important');
    }
}

function getAmountInput() {
    return document.getElementById('donations_sum_number');
}

function setAmountBorders(ignoreChecked) {
    var labels = document.querySelectorAll('#donationAmounts > .mkdf-form-item-button > label, #donationAmounts > .mkdf-form-item-labeled > label');
    var borderElement;
    for (var i = 0; i < labels.length; i++) {
        var label = borderElement = labels[i];
        var input = document.getElementById(label.htmlFor);
        if (input.id === 'donations_sum_write') {
            borderElement = getAmountInput();
        }
        setAmountBorder(borderElement, input.checked || ignoreChecked);
    }
}

function changeDonationAmount() {
    document.getElementById("mkdf.donate.sum.notice").style.setProperty('color', '', 'important');
    setAmountBorders(false);
}

function flashAmountBorders(times, on) {
    setAmountBorders(on);
    if (times <= 0 && !on) {
        return;
    }
    setTimeout(function () {
        flashAmountBorders(times - 1, !on);
    }, 300);
}

function isValidAmount() {
    var donationsSums = document.getElementsByName('donations_sum');
    var checked = document.querySelector('input[name=\'donations_sum\']:checked');
    var amount = checked && checked.value === 'custom' ? parseFloat(getAmountInput().value) : NaN;
    if (!donationsSums[0].checkValidity() ||
        (checked && checked.value === 'custom' && (isNaN(amount) || amount <= 0))) {
        document.getElementById("mkdf.donate.sum.notice").style.setProperty('color', 'red', 'important');
        if (checked && checked.value === 'custom') {
            checked.checked = false;
        }
        flashAmountBorders(4, true);
        return false;
    }
    return true;
}

function setCustomerDataBorders(on) {
    setAmountBorder(document.getElementById('customer_data'), on);
}

function flashCustomerDataBorders(times, on) {
    setCustomerDataBorders(on);
    if (times <= 0 && !on) {
        return;
    }
    setTimeout(function () {
        flashCustomerDataBorders(times - 1, !on);
    }, 300);
}

function isValidCustomerData(fullName, idCode, email) {
    if (fullName.checkValidity() && idCode.checkValidity() && email.checkValidity()) {
        return true;
    }
    flashCustomerDataBorders(4, true);
    return false;
}

function changeBankLink(el) {
    var fullName = document.getElementById('mkdf.donator.full.name');
    var idCode = document.getElementById("mkdf.donator.personCode");
    var email = document.getElementById("mkdf.donator.email");
    if (!isValidAmount() | !isValidCustomerData(fullName, idCode, email)) {
        el.checked = false;
        return;
    }

    changeBankLinkStyle(el);

    var checkedAmount = document.querySelector('input[name=\'donations_sum\']:checked');
    var amount = checkedAmount.value === 'custom' ? getAmountInput().value : checkedAmount.value;

    var gatewayUrl = document.getElementById("mkdf.gateway.url");

    var donationProjectId = getCurrentDonationProjectId();
    var locale = document.getElementById("mkdf.locale");
    var country = document.getElementById("mkdf.country");

    if ((gatewayUrl.checkValidity() && donationProjectId)) {
        var url = getGatewayUrl(gatewayUrl.value, donationProjectId, el.value, "false", amount, fullName.value, idCode.value, email.value, locale.value, country.value);
        console.log(url.toString());
        window.open(url, '_blank');
    } else {
        console.log('Parameters not valid!');
    }
}

function changeBankLinkStyle(el) {
    var donationsBanks = document.getElementsByName(el.name);
    for (var i = 0; i < donationsBanks.length; i++) {
        var element = donationsBanks[i];
        var elementToResetStyles = element.nextElementSibling;
        elementToResetStyles.style.setProperty('border', '4px solid #FFF', 'important');
    }

    var elementToApplyStyles = el.nextElementSibling;
    elementToApplyStyles.style.setProperty('background', '#FFC600', 'important');
    elementToApplyStyles.style.setProperty('border', '4px solid #F7D728', 'important');
}

function getGatewayUrl(gatewayUrl, donationProjectId, channel, standingOrder, amount, fullName, idCode, email, locale, country) {
    var url = new URL(gatewayUrl + '/donate.html');
    url.searchParams.append('do', donationProjectId);
    url.searchParams.append('ch', channel);
    url.searchParams.append('st', standingOrder);

    url.searchParams.append('am', amount == null ? '' : amount);
    url.searchParams.append('na', fullName == null ? '' : fullName);
    url.searchParams.append('pe', idCode == null ? '' : idCode);
    url.searchParams.append('em', email == null ? '' : email);
    url.searchParams.append('lo', locale == null ? '' : locale);
    url.searchParams.append('co', country == null ? '' : country);

    return url.toString();
}


function getCurrentDonationProjectId() {
    var e = document.getElementsByClassName("project-select")[0];
    return e.options[e.selectedIndex].getAttribute("data-project-id");
}

function changeBankLinkSo(el) {
    changeBankLinkStyle(el);

    var gatewayUrl = document.getElementById("mkdf.gateway.url");

    var donationProjectId = getCurrentDonationProjectId();
    var locale = document.getElementById("mkdf.locale");
    var country = document.getElementById("mkdf.country");

    if (gatewayUrl.checkValidity() && donationProjectId) {
        var url = getGatewayUrl(gatewayUrl.value, donationProjectId, el.value, "true", null, null, null, null, locale.value, country.value);
        console.log(url.toString());
        window.open(url, '_blank');
    } else {
        console.log('Parameters not valid!');
    }
}

function validate(input) {
    var feedback = input.nextElementSibling;
    feedback.style.setProperty('display', (input.checkValidity() ? 'none' : 'inline-block'), 'important');
}

function donationSumNeedBeChecked() {
    var checked = null;
    var donationsSums = document.getElementsByName("donations_sum");
    for (var i = 0; i < donationsSums.length; i++) {
        var element = donationsSums[i];
        if (element.checked) {
            checked = element;
            break;
        }
    }
    return !!checked && checked.value === 'custom';
}

function syncSelectDropdowns(tab) {
    var isOneTimeTab = tab === 'one-time';
    var e = document.getElementsByClassName("project-select")[isOneTimeTab ? 0 : 1];
    document.getElementsByClassName("project-select")[isOneTimeTab ? 1 : 0][e.selectedIndex].selected = true;
    return e.options[e.selectedIndex];
}

function deselectDonationAmounts() {
    var checked = document.querySelector('input[name=\'donations_sum\']:checked');
    if (checked != null) {
        checked.checked = false
        setAmountBorders(false);
    }
}

function selectDropdownChange(tab) {
    var donationsSumPrefix = "donations_sum_";
    deselectDonationAmounts();
    var el = syncSelectDropdowns(tab);

    for (var i = 0; i < 3; i++) {
        var amount = el.getAttribute("data-amount" + i);
        var amountDiv = document.getElementById(donationsSumPrefix + i + "-div");
        if (amount != null) {
            showElement(amountDiv, 'inline-block');
            document.getElementById(donationsSumPrefix + i).setAttribute("value", amount);
            document.getElementById(donationsSumPrefix + i + "-span").textContent = amount;
        } else {
            hideElement(amountDiv);
        }
    }

    var chooseCustomAmount = el.getAttribute("data-custom-amount");
    var customAmountBlock = document.getElementById("custom-amount-block");
    if (chooseCustomAmount != null) {
        showElement(customAmountBlock, 'inline-block')
    } else {
        hideElement(customAmountBlock)
    }

    switchTab()
}

