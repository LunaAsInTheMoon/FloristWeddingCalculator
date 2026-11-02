document.addEventListener('DOMContentLoaded', function() {
    // Price ranges
    const pricesClassic = {
        bridalBouquet:       { min: 185, max: 290,  val: 0 },
        bridesmaidBouquet:   { min: 75,  max: 125,  val: 0 },
        buttonhole:          { min: 10,  max: 15,   val: 0 },
        corsage:             { min: 15,  max: 25,   val: 0 },
        lowCentrepiece:      { min: 65,  max: 90,  val: 0 },
        highCentrepiece:     { min: 180, max: 280,  val: 0 },
        pedestalDisplay:     { min: 250, max: 400,  val: 0 },
        statementFlorals:    { min: 2000,max: 5000, val: 0 }
    };

    const pricesCouture = {
        bridalBouquet:       { min: 290, max: 400,  val: 0 },
        bridesmaidBouquet:   { min: 125, max: 250,  val: 0 },
        buttonhole:          { min: 20,  max: 35,   val: 0 },
        corsage:             { min: 25,  max: 50,   val: 0 },
        lowCentrepiece:      { min: 125, max: 250,  val: 0 },
        highCentrepiece:     { min: 300, max: 500,  val: 0 },
        pedestalDisplay:     { min: 500, max: 800,  val: 0 },
        statementFlorals:    { min: 2000,max: 5000, val: 0 }
    };

    const itemDescs = {
        bridalBouquet:       'A natural hand tied bouquet or a cascading formal design. \n Created using high quality blooms to suit your theme and style.',
        bridesmaidBouquet:   'Created to compliment the bride and their dresses.',
        buttonhole:          'Be it a single bloom or something more elaborate such as a pocket square or lapel design.',
        corsage:             'Delicate wired &amp; glued designs for female members of the bridal party. Can be worn in multiple ways. \n (Mums, Grandmother etc)',
        lowCentrepiece:      'A low bowl, a group of bud vases filled, or low table scape.',
        highCentrepiece:     'A tall larger arrangement presented on a box stand or pedestal in the middle of the table.',
        pedestalDisplay:     'Large front facing designs to be utilised throughout the day.',
        statementFlorals:    'Large installations for your special day. \n (Pricing dependent on location and installation requirements) '
    };

    var prices = pricesClassic;

    document.getElementById('classicBtn').addEventListener('click', function() {
        classicBtn.classList.add("active");
        coutureBtn.classList.remove("active");
        prices = pricesClassic;
        init();
    });
    
    document.getElementById('coutureBtn').addEventListener('click', function() {
        coutureBtn.classList.add("active");
        classicBtn.classList.remove("active");
        prices = pricesCouture;
        init();
    });

    let totalVal = { min: 0, max: 0 };

    function setPrice(id, item) {
        const elParent = document.getElementById(id);
        const el = elParent.querySelector('.price');
        if (el) {
            el.textContent = `£${item.min.toFixed(0)} - £${item.max.toFixed(0)}.ea`;
        }
    }

    function setDesc(id, desc) {
        const elParent = document.getElementById(id);
        const el = elParent.querySelector('.item-description');
        if (el) {
            el.textContent = `${desc}`;
        }
    }

    function updateTotal(item) {
        const el = document.getElementById('totalPrice');
        if (el) {
            el.textContent = `Total cost: £${item.min.toFixed(0)} - £${item.max.toFixed(0)}`;
        }
    }

    function update() {
        totalVal = { min: 0, max: 0 };
        for (let key in prices) {
            totalVal.min += prices[key].min * prices[key].val;
            totalVal.max += prices[key].max * prices[key].val;
        }
        updateTotal(totalVal);
    }

    function init() {
        let allItems = document.querySelectorAll('.row');
        update();
        allItems.forEach(control => {
            let itemId = control.id;
            let itemPrice = prices[itemId];
            let itemDesc = itemDescs[itemId];
            if (itemPrice) {
                setPrice(itemId, itemPrice);
                setDesc(itemId, itemDesc);
            }
        });
    }

    init();
    classicBtn.classList.add("active");

    // Quantity Controls
    document.querySelectorAll('.row').forEach(control => {
        const qtyCtrl = control.querySelector('.quantity-control');
        const plusBtn = qtyCtrl?.querySelector('.plus');
        const minusBtn = qtyCtrl?.querySelector('.minus');
        const quantityDisplay = qtyCtrl?.querySelector('.quantity');
        const price = control.querySelector('.price');
        const controlID = control.id;

        if (plusBtn && minusBtn && quantityDisplay) {
            plusBtn.addEventListener('click', () => {
                prices[controlID].val++;
                quantityDisplay.textContent = prices[controlID].val;
                update();
            });

            minusBtn.addEventListener('click', () => {
                if (prices[controlID].val > 0) {
                    prices[controlID].val--;
                    quantityDisplay.textContent = prices[controlID].val;
                    update();
                }
            });
        }
    });
});
