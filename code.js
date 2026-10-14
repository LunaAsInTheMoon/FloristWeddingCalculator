document.addEventListener('DOMContentLoaded', function() {
    // Price ranges
    const prices = {
        bridalBouquet:       { min: 195, max: 350,  val: 0 , desc: 'Created using high quality blooms to suit your theme and style.'},
        bridesmaidBouquet:   { min: 85,  max: 155,  val: 0 , desc: 'Created to compliment the bride and their dresses.'},
        buttonhole:          { min: 10,  max: 25,   val: 0 , desc: 'Be it a single bloom or something more elaborate such as a pocket square or lapel design.'},
        corsage:             { min: 15,  max: 30,   val: 0 , desc: 'Delicate wired &amp; glued designs for female members of the bridal party. Can be worn in multiple ways. \n (Mums, Grandmother etc)'},
        centrepiece:         { min: 45,  max: 250,  val: 0 , desc: 'From low and compact posies to tall statement florals, we can do it all!'},
        ceremonyArrangement: { min: 75,  max: 150,  val: 0 , desc: 'Designs to enhance your ceremony room and the moment you say ‘I Do’.'},
        pedestalDisplay:     { min: 250, max: 500,  val: 0 , desc: 'Large front facing designs to be utilised throughout the day.'},
        statementFlorals:    { min: 1000, max: 5000, val: 0 , desc: 'Large installations for your special day.'}
    };

    let totalVal = { min: 0, max: 0 };

    function setPrice(id, item) {
        const elParent = document.getElementById(id);
        const el = elParent.querySelector('.price');
        if (el) {
            el.textContent = `£${item.min.toFixed(0)} - £${item.max.toFixed(0)}.ea`;
        }
    }

    function setDesc(id, item) {
        const elParent = document.getElementById(id);
        const el = elParent.querySelector('.item-description');
        if (el) {
            el.textContent = `${item.desc}`;
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
            let item = prices[itemId];
            if (item) {
                setPrice(itemId, item);
                setDesc(itemId, item);
            }
        });
    }

    init();

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
