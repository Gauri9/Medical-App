import Medicine from '../models/Medicine.js';

//add all medicines  
export const addAllMedicines = async (req, res) => {
    console.log('addAllMedicines...')
    data.forEach(async item => {
        try{
            const medicine = new Medicine({
                title: item.title,
                company: item.company,
                category: item.category,
                tags: item.tags,
                subcategories: item.subcategories
            });
            await medicine.save()
            console.log(`Added ${item.title} to the database`);
        } catch (err) {
            console.error(`Error saving ${item.title}: ${err}`);
        }
    });

}

export const getMedicineNames = async(req, res) => {
    console.log('inside getMedicineNames...')
    console.log(req.query.category)
    try{
        const response = await Medicine.find({category: req.query.category }).select('title company')
        // console.log('response', response)
        res.json(response)
    }
    catch(error){
        console.error('Error fetching titles:', error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    } 
}

export const getDetailsByTitleandCompany = async(req, res) => {
    console.log('inside getMedicineDetailsByTitle...')
    console.log('request', req.query)
    try{
        const response = await Medicine.find({title: req.query.title, company: req.query.company})
        console.log(response[0])
        res.json(response[0])
    }
    catch(error){
        console.error('Error fetching titles:', error)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

// get products based on search-query | search-term
export const searchAutocompleteMedicines = async (req, res) => {
    console.log('inside searchAutocompleteMedicines...')
    console.log(req.query.searchTerm);
    try {
        
        const searchResults = await Medicine.aggregate([
            {
                '$search': {
                    index: 'autocomplete_search_index',
                    "autocomplete": {
                      query: req.query.searchTerm, //om, ome
                      path: 'title',
                    //   fuzzy:{
                    //       maxEdits:2, //spelling mistake
                    //       maxExpansions: 1
                    //   }
                    },
                }
            },
            { 
                "$project": {
                  "title": 1,
                  "company": 1,
                  "_id":0
                }
            },
            {
                "$limit": 9
            }
            ]);
            console.log(searchResults)
        //send result of search query from mongodb
        res.status(200).json(searchResults);
    }
    catch(error){
        console.log('error')
        res.status(500).json({ message: error.message });
    }
}


const data = [
    {
        "title": "Calcarea Fluorica 6x",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Piles, ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea phosphorica 6x",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Fracture, dentition, suppliment for children, useful during pregnancy, puberty, old age",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea Sulphurica 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Acne, Skin, boils, eczema, fibroids etc",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ferrum Phosphoricum 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Anaemia, feverish condition, cattrahal condition of respiratory tract etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Five Phos 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Weakness and prostration ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Silicea 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Acne, Piles, Skin, bones ,etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ammi Visnaga MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Skin - Leucoderma / Vitiligo",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Agnus Castus MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Sexual Wellness",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 125,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Apocynum Cannabinum MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Urinary, Dropsy  etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 265,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aesculus Hippocastanum MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Piles, Back, spondylitis etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Allium cepa MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": " coryza, Allergic rhinitis, etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Azadirachta Indica MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Skin, etc",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Alfalfa MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "General tonic, weakness, fatigue, loss of appetite etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Apis mellifica MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Skin, kidney, cyst, dropsy / swelling etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica Montana MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Hair, injury, bone etc",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 240,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ambroma Augusta MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "To control blood sugar",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Avena Sativa MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "General tonic, loss of appetite etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Allium Sativum MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Cholesterol, blood pressure etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Berberis Vulgaris MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Stone in kidney, bladder, gall bladder stone etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Boerhaavia Diffusa MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Berberis Aquifolium MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Acne, Skin",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 240,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Belladonna MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Headache, fever, pain, tonsils etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bramhi (Bacopa Monnieri) MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "For weakness of Memory ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Baptisia Tinctoria MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Fever, Typhoid fever etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 280,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bellis Perrinis",
        "company": "Schwabe",
        "category": "Mother Tinctures",
        "tags": "Nerve injury , nerves etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 115,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Blatta orientalis MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Respiratory, Asthma etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Chionanthus Virginica MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 365,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cantharis MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Urinary, Urinary tract infection, burning in urination, etc., hair fall, dandruff, ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 330,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Curcuma Longa MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cephalandra Indica MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Diabetes etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calendula Officinalis MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Skin wound healing, antiseptic etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Crataegus oxyacantha MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Cardiac Weakness, Heart tonic etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Chelidonium Majus MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Liver Diseases, Digestive Problem",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ceanothus Americanus",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 315,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cardus Marianus MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Liver Diseases",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calotropis Gigantea MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Caprica Papaya MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Collinsonia Canadensis MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Piles",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Damiana MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Sexual Wellness",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Echinacea Angustifolia MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Embelica Officinalis MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Fucus vesiculosus MT",
        "company": "Schwabe",
        "category": "Mother Tinctures",
        "tags": "Weight Managment",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 140,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Fucus vesiculosus MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Weight Managment",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ginseng MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 365,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ginkgo Biloba MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Guiacum MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 495,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gymnema Sylvestre MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture, Diabetes ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Guatteria Gaumeri MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Cholesterol etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 330,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gaultheria Procumbens MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 330,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Grindelia Robusta MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture, Asthma, respiratory etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 240,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hydrangea Arborescens MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Urinary, Stone kidney, bladder etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hydrastis Canadensis MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture cancer cachexia, Digestive system etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 425,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Justicia Adhatoda MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Cough, respiratory etc.",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Jaborandi MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Dandruff, Hair fall etc",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Janosia Ashoka MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Female, uterine tonic",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum phosporicum 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Sour eructation, vomiting, heart burn, indigestion, acidity, nocturnal enuresis, etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum Sulphuricum 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Liver Diseases, Gastric biliousness, liver dysfunction, uric acid diathesis etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum Muriaticum 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Sun stroke, headache, eye strain, constipation, etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 6,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Magnesium Phosporica 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Muscular cramps, pains, convulsions, flatulent colic etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Muriaticum ",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Sub acute catarrhal affection of middle ear, throat, glandular inflammation etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali phosphoricum 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Weakness, exhaustion, mental & physical weakness, sleeplessness, melancholy, examination fear, back pain, etc.",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Sulphuricum 6X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Dandruff, itchy skin, catarrh with yellowish discharge (bronchitis, pharyngitis, chronic suppuration, otitis media,seasonal rashesh",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lycopodium MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Liver Diseases, Sexual Wellness, Digestive Problem, Kidney stone",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Muira Puama MT",
        "company": "Schwabe",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 410,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Myrica Cerifera MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Liver Diseases",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 365,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ocimum Canum MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ocimum Sanctum MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Phytolacca MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 125,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Plantago Major MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Toothache ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Pareira Brava MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Urinary, Kidney stone ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Phytolacca Berry MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Weight Managment",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 240,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Passiflora Incarnata MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Insomnia, Anxiety, stress ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 125,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Robinia Pseudocacia MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Digestive Problem, HyperAcidity ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 120,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ruta Graveolens MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Bone, ligaments, eye strain, injury ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 130,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rhus Toxicodendron MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Joint, bone, skin",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 315,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ratanhia MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Piles",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rauwolfia Serpentina MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Heart, blood pressure ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Syzygium Jambolanum MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Diabetes ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Symphytum Officinale MT",
        "company": "Schwabe",
        "category": "Mother Tinctures",
        "tags": "Bone, fracture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 130,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sarsaparilla MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Urinary, Kidney stone, bladder stone ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sarsaparilla MY",
        "company": "Schwabe",
        "category": "Mother Tinctures",
        "tags": "Urinary, Kidney stone, bladder stone ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 195,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Solidago Virgaurea MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 330,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Spongia Tosta MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Respiratory, cough ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 345,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sabal Serrulata MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Prostate hypertrophy in male ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 280,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Thalaspi Bursa Pastoris MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 220,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Terminalia Arjuna MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Heart, blood pressure ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Thuja Occidentalis MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tinospora Cordifolia MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tribulus Terrestris MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Urtica Urens MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Uva Ursi MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 315,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Withania S, Ashwagandha MT",
        "company": "SBL",
        "category": "Mother Tinctures",
        "tags": "Mother tincture ",
        "subcategories": [
            {
                "Package": "Q 30ml",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio combination No 1, 3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Anaemia ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 2, 3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Breathlessness ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 3, 3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Colic",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 4, 3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Constipation ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 5",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Coryza ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 6,3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Cough, cold, catarrh",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 7,3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Bio Combination ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 8, 3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Diarrhoea ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 9",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Dysentery ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 10, 3X",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Enlarged Tonsils",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 11",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Bio Combination ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 12",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Headache ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 13",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Leucorrhoea ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 14",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Measles ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 15",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Uterine tonic ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 16",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Stress, exhaustion ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 17",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Piles, enlarged rectal veins",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 18",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Pyorrhoea",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 19",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Joint, muscle pain",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 20",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Skin disease ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 6,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 21",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Teething trouble ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 22",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Scrofula ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 23",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Toothache ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 24",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Debility, exhaustion ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 25",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Acidity, flatulence, indigestion ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 26",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Easy Parturition ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 27",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Lack of vitality ",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bio Combination No 28",
        "company": "SBL",
        "category": "Biochemics",
        "tags": "Tonic",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "3x 25g",
                "MRP": 105,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Five Phos 6X",
        "company": "Dr Reckeweg",
        "category": "Biochemics",
        "tags": "Weakness, exhaustion",
        "subcategories": [
            {
                "Package": "Tablets",
                "Size": "6x 25g",
                "MRP": 185,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Y lax ",
        "company": "Bakson",
        "category": "Patents",
        "tags": "Constipation ",
        "subcategories": [
            {
                "MRP": 500,
                "Discounted Percentage": 10,
                "Stock Quantity": 6,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Y Lax Tablets ",
        "company": "Bakson",
        "category": "Patents",
        "tags": "Constipation ",
        "subcategories": [
            {
                "MRP": 215,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Phytolacca Berry MT Tablets ",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Weight Managment",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arsenicum Album 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "CM 10ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Argentum Nitricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Allium Cepa 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arsenicum Bromatum 30C",
        "company": "Medisynth ",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidum Nitricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Avena Sativa 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidum Muriaticum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Antimonium Tartaricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidum Carbolicum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Antimonium Crudum 30 CH ",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Antimonium Crudum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica Montana 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Anthracinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Agaricus Muscarius 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Angustura Vera 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidium Benzoicum 30cH",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidium Benzoicum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum triphyllum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum Metallicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum Metallicum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arsenicum Iodatum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum Muriaticum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            },
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum Muriaticum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 80,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ammonium Carbonicum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ammonium Carbonicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Apocynum Cannabinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aloe Socotrina 30 C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Agnus Castus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ammonium Muriaticum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Apis mellifica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum Arsenicum 30C",
        "company": "Medisynth ",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Alumina 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Abrotanum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum Muriaticum Natronatum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Actea Spicata 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aurum sulphuratum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Asafoetida 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arsenicum Sulph. Flavum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aralia Racemosa 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Argentum Metallicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidum Sulphuricum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidum Hydrofluoricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Anacardium Orientale 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acidum Phosphoricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aesculus Hippocastanum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Belladonna 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bacillunum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Berberis Vulgaris 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bovista 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Borax 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bellis Perennis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Baryta Carbonica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Baptisia Tinctoria 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Berberis Aquifolium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Baryta Phosphorica 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bryonia Alba 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Baryta Muriatica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Badiaga 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Blatta orientalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bothrops Lanceolatus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Chamomilla 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Colchicum Autumnale 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Coffea Tosta 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Coffea Tosta 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Chelidonium Majus 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cina 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cina 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea Fluoricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Carcinosinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Coffea Cruda 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "test123",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Itching, Pain Relief",
        "subcategories": [
            {
                "Package": "12CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 5,
                "Stock Quantity": 10,
                "Availability": "Not in Stock"
            }
        ]
    },
    {
        "title": "test2",
        "company": "Schwabe",
        "category": "3X Dilutions",
        "tags": "Cardiac Weakness, Dandruff",
        "subcategories": [
            {
                "Package": "3x 30ml",
                "MRP": 100,
                "Discounted Percentage": 7,
                "Stock Quantity": 10,
                "Availability": "Out of Stock"
            }
        ]
    },
    {
        "title": "Chimaphila Umbellatay 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Collinsonia Canadensis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cyclamen Europaeum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Chinium Sulphuricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cydonia Vulgaris 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Crocus Sativus 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Crocus Sativus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            },
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea Arsenicosa 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Copaiva Officinalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Coccus Cacti 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Clematis Erecta 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cactus Grandiflorus 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cactus Grandiflorus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Chloralum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cholesterinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cineraria Maritima 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cobaltum Metallicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cuprum Aceticum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cimicifuga Racemosa 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cedron 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Crotalus Horridus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Corallium Rubrum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cantharis 30C",
        "company": "Medisynth ",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cantharis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Carbo vegetabilis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea Sulphurica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Caulophyllum thalictroides 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Croton Tiglium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Capsicum annum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cinchona Officinalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cicuta Virosa 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            },
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea Phosphorica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea phosphorica 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Conium Maculatum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 100,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Causticum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Colocynthis ",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cuprum Metallicum 30C ",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calcarea Iodata 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Drosera Rotundifolia 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Dulcamara 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Dolichos 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Euphrasia Officinalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Eupatorium Perfoliatum 30C",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Equisetum Hyemale 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Echinacea Angustifolia 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Folliculinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ferrum Metallicum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Formica Rufa 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ferrum Phosphoricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ferrum Picricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Fraxinus Americana 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ambra Grisea 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Asterias Rubens 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Guiacum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gnaphalium polycephalum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gelsemium Sempervirens 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Graphites 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gloninium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gossypium herbaccum 30C",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Histaminum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hyoscyamus niger 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hydrastis Canadensis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hepar sulphur 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hekla lava 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hydrocotyle Asiatica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hura brasiliensis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hypericum perforatum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hypericum perforatum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Helleborus Niger 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ignatia Amara 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Iris Versicolor 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ipecacuanha 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Influenzinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Iodium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Insulinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali nitricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Muriaticum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Bichromicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Bromatum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Acne, Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Carbonicum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali phosphoricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali phosphoricum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Sulphuricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Chloratum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kreosotum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 80,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Arsenicosum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kali Cynatum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lachesis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lachesis 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lemna minor 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lycopodium clavatum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ledum palsutre 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lapis Albus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lilium Tigrinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lilium Tigrinum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lac Canium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lobelia inflata 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lachnanthus Tinctoria 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Lyssin 30C",
        "company": "Medisynth ",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Magnesia Sulphurica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mercurius iod. Ruber 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Magnesia Muriatica 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Magnesia Carbonica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mephitis mephitica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Medorrhinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mercurius solubilis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mercurius iod. Flavus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Magnesia phosphorica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mercurius corrosivus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mezereum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mercurius Dulcis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum Muriaticum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum phosporicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 80,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum Carbonicum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum Carbonicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Natrum Sulphuricum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Nux moschata 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Nux vomica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ovarinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Origanum Vulgare 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Onosmodium virginianum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Onosmodium virginianum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Opium 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Paris quadrifolia 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Plumbum Metallicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Platinum Metallicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Pancreatinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Passiflora Incarnata 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Paeonia Officinalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Psorinum 30CH",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 80,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Pertussinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Paraffinum 30CH",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 80,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Phosphorus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Palladium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Pyrogenium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Podophyllum peltatum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Phytolacca 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Petroleum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Pulsatilla nigricans 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ratanhia 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rhododendron chrysanthum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rhododendron chrysanthum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Robinia Pseudoacacia 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rhus Toxicodendron 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rhus Toxicodendron 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ruta Graveolens 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Renalis Calculi 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ranunculus Bulbosus 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Raphanus Sativus 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ranunculus bulbosus 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Raphanus Sativus 30C ",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sulphur 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Squilla 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Senna 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sarsaparilla 30C ",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Selenium 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 6,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Selenium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Spongia Tosta 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Strontium Carbonicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sepia 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Staphysagria 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Symphytum Officinale 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Symphytum Officinale 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Stramonium 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Stramonium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Spigelia 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Spigelia 30X",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sabina 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sabina 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sabal Serrulata 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sachhrum Officinalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sanguinarium nitricum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sanguinaria Canadensis 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sambucus Nigra 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Silicea 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sanicula europaea 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Santonium 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Secale cornumtum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sticta pulmonaria 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sabadilla 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sabadilla 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Salix nigra 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Stannum Metallicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            },
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Syphilinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Thea chinensis 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Thuja Occidentalis 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Thuja Occidentalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tubercullinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Thyroidinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tabacum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Theridion",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Testosteronum 12",
        "company": "St. George",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "12CH 30ml",
                "MRP": 125,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tellurium 30",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tatentula cubensis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tatentula hispanica 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tribulus Terrestris 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Teucrium marum verum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Uranium nitricum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ustilago maydis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Urtica Urens 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Urtica Urens 30C",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 95,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Urea 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Valeriana Officinalis 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Veratrum album 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Variolinum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Vipera torva 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Wiesbaden 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Withania S. 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 85,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Yohimbinum 30CH",
        "company": "Schwabe",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Zincum Metallicum 30C",
        "company": "SBL",
        "category": "Centesimal potency",
        "tags": "Dilution ",
        "subcategories": [
            {
                "Package": "30CH 30ml",
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "BT Anti-Dandruff Shampoo ",
        "company": "B.T.",
        "category": "Patents",
        "tags": "Shampoo",
        "subcategories": [
            {
                "MRP": 145,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "BT Arnica Shampoo ",
        "company": "BT",
        "category": "Patents",
        "tags": "Shampoo ",
        "subcategories": [
            {
                "MRP": 140,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "BT Anti-Dandruff Oil",
        "company": "BT",
        "category": "Patents",
        "tags": "Anti-Dandruff Hair Oil ",
        "subcategories": [
            {
                "MRP": 135,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "BT Hair Growth oil ",
        "company": "BT",
        "category": "Patents",
        "tags": "Hair growth oil ",
        "subcategories": [
            {
                "MRP": 180,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "BT Neem Face Wash",
        "company": "BT",
        "category": "Patents",
        "tags": "Face Wash",
        "subcategories": [
            {
                "MRP": 80,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Skin care bathing bar soap",
        "company": "BT",
        "category": "Patents",
        "tags": "Soap",
        "subcategories": [
            {
                "MRP": 60,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "BT Akne-Sor Soap",
        "company": "BT",
        "category": "Patents",
        "tags": "Bathing bar soap ",
        "subcategories": [
            {
                "MRP": 50,
                "Discounted Percentage": 5,
                "Stock Quantity": 8,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica Montana herbal shampoo ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Shampoo ",
        "subcategories": [
            {
                "MRP": 180,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            },
            {
                "MRP": 170,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica Montana Shampoo ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Shampoo ",
        "subcategories": [
            {
                "MRP": 170,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            },
            {
                "MRP": 110,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica Montana oil ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Hair fall oil",
        "subcategories": [
            {
                "MRP": 90,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            },
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Jaborandi hair Oil ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Hair oil ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            },
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Silk'n stay talcum powder ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Talcum powder ",
        "subcategories": [
            {
                "MRP": 85,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Silk'n stay alovera cream",
        "company": "SBL",
        "category": "Patents",
        "tags": " cream or ointment ",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Glowing beauty cream ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Skin",
        "subcategories": [
            {
                "MRP": 65,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            },
            {
                "MRP": 100,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Silk n'stay anti acne soap",
        "company": "SBL",
        "category": "Patents",
        "tags": "Soap",
        "subcategories": [
            {
                "MRP": 55,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Silk n'stay refreshing bar",
        "company": "SBL",
        "category": "Patents",
        "tags": "Bathing soap",
        "subcategories": [
            {
                "MRP": 55,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Silk n'stay antiseptic soap",
        "company": "SBL",
        "category": "Patents",
        "tags": "Antiseptic soap ",
        "subcategories": [
            {
                "MRP": 50,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Neem face wash ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Face wash ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sunny arnica shampoo ",
        "company": "Sunny ",
        "category": "Patents",
        "tags": "Shampoo ",
        "subcategories": [
            {
                "MRP": 620,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sunny arnica shampoo ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Shampoo ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Adven Anti dandruff shampoo ",
        "company": "Adven ",
        "category": "Patents",
        "tags": "Anti dandruff shampoo ",
        "subcategories": [
            {
                "MRP": 150,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Adven keratin protein shampoo ",
        "company": "Adven",
        "category": "Patents",
        "tags": "Shampoo ",
        "subcategories": [
            {
                "MRP": 150,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bakson Hair Reviver ",
        "company": "Bakson",
        "category": "Patents",
        "tags": "Hair ",
        "subcategories": [
            {
                "MRP": 499,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica hair treatment ",
        "company": "Wheezal",
        "category": "Patents",
        "tags": "Hair",
        "subcategories": [
            {
                "MRP": 145,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sunny All purpose cream Alovera Calendula ",
        "company": "Sunny ",
        "category": "Patents",
        "tags": "Skin ",
        "subcategories": [
            {
                "MRP": 485,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sunny alovera calendula all purpose cream ",
        "company": "Sunny",
        "category": "Patents",
        "tags": "Skin care",
        "subcategories": [
            {
                "MRP": 290,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sunny alovera calendula all purpose cream ",
        "company": "Sunny ",
        "category": "Patents",
        "tags": "Skin care ",
        "subcategories": [
            {
                "MRP": 170,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "BT multi purpose cream ",
        "company": "BT",
        "category": "Patents",
        "tags": "Skin care ",
        "subcategories": [
            {
                "MRP": 115,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sunny Derm Aid Soap",
        "company": "Sunny",
        "category": "Patents",
        "tags": "Soap",
        "subcategories": [
            {
                "MRP": 55,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Dermex Antibacterial Soap ",
        "company": "Hapdco",
        "category": "Patents",
        "tags": "Soap",
        "subcategories": [
            {
                "MRP": 80,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Face Wash gel Sunny ",
        "company": "Sunny",
        "category": "Patents",
        "tags": "Face Wash ",
        "subcategories": [
            {
                "MRP": 155,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Deep Cleansing Milk Sunny",
        "company": "Sunny ",
        "category": "Patents",
        "tags": "Cosmetics ",
        "subcategories": [
            {
                "MRP": 135,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sunny Arnica Shampoo ",
        "company": "Sunny",
        "category": "Patents",
        "tags": "Shampoo ",
        "subcategories": [
            {
                "MRP": 355,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Glowing beauty sunscreen lotion ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Sun screen ",
        "subcategories": [
            {
                "MRP": 199,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnikesh Scalp Treatment ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Hair Oil ",
        "subcategories": [
            {
                "MRP": 130,
                "Discounted Percentage": 5,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Jaborandi hair treatment oil",
        "company": "Wheezal",
        "category": "Patents",
        "tags": "Hair Oil ",
        "subcategories": [
            {
                "MRP": 405,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica hair treatment ",
        "company": "Wheezal ",
        "category": "Patents",
        "tags": "Hair Oil ",
        "subcategories": [
            {
                "MRP": 400,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Camy black K2 Arnica Hair Oil ",
        "company": "Lord's",
        "category": "Patents",
        "tags": "Hair Oil ",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Jaborandi hair serum",
        "company": "Sunny ",
        "category": "Patents",
        "tags": "Hair",
        "subcategories": [
            {
                "MRP": 380,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Marks go cream ",
        "company": "Hapdco",
        "category": "Patents",
        "tags": "Cosmetics ",
        "subcategories": [
            {
                "MRP": 105,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            },
            {
                "MRP": 105,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Angel gloss complexion cream",
        "company": "Bhargava ",
        "category": "Patents",
        "tags": "Cosmetics ",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calendula powder ",
        "company": "Bjain",
        "category": "Patents",
        "tags": "Injury ",
        "subcategories": [
            {
                "MRP": 60,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tooth powder ",
        "company": "Wheezal",
        "category": "Patents",
        "tags": "Teeth Powder ",
        "subcategories": [
            {
                "MRP": 120,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Calendula dressing powder ",
        "company": "Wheezal ",
        "category": "Patents",
        "tags": "Injury or wound ",
        "subcategories": [
            {
                "MRP": 130,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aqui folium cream ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Skin acne",
        "subcategories": [
            {
                "MRP": 100,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Skookum chuck ",
        "company": "Lord's ",
        "category": "Patents",
        "tags": "Skin",
        "subcategories": [
            {
                "MRP": 70,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acne aid cream ",
        "company": "Bakson",
        "category": "Patents",
        "tags": "Acne",
        "subcategories": [
            {
                "MRP": 95,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Anti marks cream",
        "company": "Biovalley",
        "category": "Patents",
        "tags": "Cosmetics ",
        "subcategories": [
            {
                "MRP": 120,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aqui plus cream ",
        "company": "Hapdco ",
        "category": "Patents",
        "tags": "Acne",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "S cure cream",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Acne pigmentation ",
        "subcategories": [
            {
                "MRP": 95,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Skookum chuck ",
        "company": "LDD Bioscience ",
        "category": "Patents",
        "tags": "Skin",
        "subcategories": [
            {
                "MRP": 60,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Soundarya homoeopathic cream ",
        "company": "BBP",
        "category": "Patents",
        "tags": "Acne pigmentation scar",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 5,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Mel X melasma face wash ",
        "company": "Wheezal ",
        "category": "Patents",
        "tags": "Face wash ",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sun protection Adven",
        "company": "Adven",
        "category": "Patents",
        "tags": "Sun protection ",
        "subcategories": [
            {
                "MRP": 300,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Enlacto 5 phos tonic",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Weakness exhaustion ",
        "subcategories": [
            {
                "MRP": 115,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Alpha liv liver tonic",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Liver tonic ",
        "subcategories": [
            {
                "MRP": 350,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Dengma Surup ",
        "company": "Lord's ",
        "category": "Patents",
        "tags": "Platelet dengu ",
        "subcategories": [
            {
                "MRP": 150,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ague Nil syrup",
        "company": "Bhargava ",
        "category": "Patents",
        "tags": "Platelet dengu",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 7,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Astha Aid syrup ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Asthma",
        "subcategories": [
            {
                "MRP": 130,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Homoeovit with Alfalfa anr Ginseng",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "General weakness & exhaustion ",
        "subcategories": [
            {
                "MRP": 315,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kalmegh Syrup",
        "company": "SBL",
        "category": "Patents",
        "tags": "Liver",
        "subcategories": [
            {
                "MRP": 90,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "ES03 Bronchit Syrup",
        "company": "Noble",
        "category": "Patents",
        "tags": "Cough syrup ",
        "subcategories": [
            {
                "MRP": 190,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "ES04 Bronchit Syrup ",
        "company": "Noble",
        "category": "Patents",
        "tags": "Cough syrup ",
        "subcategories": [
            {
                "MRP": 190,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Angio card gold plus drops",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Heart drops",
        "subcategories": [
            {
                "MRP": 195,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "E41 Dyspep Drops",
        "company": "Noble ",
        "category": "Patents",
        "tags": "Dyspepsia ",
        "subcategories": [
            {
                "MRP": 235,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Earogin drops",
        "company": "Doliosis ",
        "category": "Patents",
        "tags": "Drops ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Nasal Aid ",
        "company": "Bakson",
        "category": "Patents",
        "tags": "Nasal obstruction ",
        "subcategories": [
            {
                "MRP": 105,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Baksodent Tooth paste ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Tooth paste",
        "subcategories": [
            {
                "MRP": 75,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Wheezal Dental Cream",
        "company": "Wheezal ",
        "category": "Patents",
        "tags": "Tooth paste ",
        "subcategories": [
            {
                "MRP": 85,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hekla Lava Charcoal Toothpaste ",
        "company": "Wheezal",
        "category": "Patents",
        "tags": "Tooth paste ",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Homeodent Gel Toothpaste ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Tooth paste ",
        "subcategories": [
            {
                "MRP": 75,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Homeodent toothpaste ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Tooth paste ",
        "subcategories": [
            {
                "MRP": 75,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Omeo Mouth ulcer Tablet ",
        "company": "Bjain",
        "category": "Trituration tablets",
        "tags": "Mouth ulcer ",
        "subcategories": [
            {
                "Package": "3x Tablets",
                "Size": "20g",
                "MRP": 140,
                "Discounted Percentage": 10,
                "Stock Quantity": 1
            }
        ]
    },
    {
        "title": "Rinsout Drops",
        "company": "SBL",
        "category": "Patents",
        "tags": "Mouth ulcer ",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Vertefine drops",
        "company": "SBL",
        "category": "Patents",
        "tags": "Lumbago ",
        "subcategories": [
            {
                "MRP": 140,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tonsilon forte oral drops",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Tonsillitis ",
        "subcategories": [
            {
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "B2 Stomach Drops Bakson",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Stomach drops ",
        "subcategories": [
            {
                "MRP": 185,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ferrumsip syrup ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Iron homeopathic tonic",
        "subcategories": [
            {
                "MRP": 125,
                "Discounted Percentage": 10,
                "Stock Quantity": 12,
                "Availability": "Available"
            },
            {
                "MRP": 190,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Homeovit with alfalfa and ginseng ",
        "company": "Bakson",
        "category": "Patents",
        "tags": "General weakness exhaustion ",
        "subcategories": [
            {
                "MRP": 120,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Orthomuv Sugar free syrup ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Joint, osteoarthritis ",
        "subcategories": [
            {
                "MRP": 150,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Five Phos A+",
        "company": "SBL",
        "category": "Patents",
        "tags": "Weakness exhaustion ",
        "subcategories": [
            {
                "MRP": 130,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Diabekoll non sugar syrup ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Diabetes ",
        "subcategories": [
            {
                "MRP": 115,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gasgan eaz.y sugar free syrup ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Acidity, gasses",
        "subcategories": [
            {
                "MRP": 125,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Gasgan eazy Sugar free syrup ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Acidity gasses ",
        "subcategories": [
            {
                "MRP": 320,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Aquifolium oral drops",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Acne pigmentation scar",
        "subcategories": [
            {
                "MRP": 130,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rheumasaj massage oil",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Muscle, joint",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rheumasaj massage oil ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Massage oil",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Wartex forte oral drops ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Warts corns",
        "subcategories": [
            {
                "MRP": 175,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 1 inflammation drops",
        "company": "Dr. Reckeweg ",
        "category": "Patents",
        "tags": "Inflammation ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 2 Gold drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Heart ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R3 Heart drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Heart drop",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R5 Stomach drop ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Stomach drop ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 6 influenza drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Influenza ",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 7 liver & gall bladder drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Liver gall bladder ",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 9 Cough drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Cough",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 13 Piles Drops ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Piles",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 14 Nerve & Sleep Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Nerve insomnia ",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 16 Migraine & Neuralgia Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Migraine Neuralgia ",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Kidney & Bladder drops ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Kidney Bladder ",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 19 Glandular drops for Men",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Male drops",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 21 Reconstituant drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Reckeweg drops",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 23 Eczema drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Eczema",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 25 - Prostatitis Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Prostate drops",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R27 Renal Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Kidney ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R29",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Vertigo ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R33 Dr Reckeweg ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Convulsions ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R37 Intestinal Colic Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Colic",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R38 Affection of right abdomen ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Right abdomen complaint ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R40 Disturbances in blood sugar",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Sugar disturbances or diabetes ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R41 Sexual Neurasthenia Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Sexual Neurasthenia ",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica plus S Anti dandruff shampoo ",
        "company": "Allen",
        "category": "Patents",
        "tags": "Anti dandruff shampoo ",
        "subcategories": [
            {
                "MRP": 120,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Arnica Plus triofer tablets",
        "company": "Allen",
        "category": "Patents",
        "tags": "Hair fall",
        "subcategories": [
            {
                "MRP": 325,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R 43 Bronchial Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Asthma Respiratory complaints ",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R45 Illness of Larynx ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Larynx complaints ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R46 Arthritis of forearm and hands",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Arthritis hand forearm ",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R49 Acute and chronic Cattarh Sinusitis ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Sinusitis Catarrh ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R55 All kinds of injuries ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Injury ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R59 Weight loss drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Obesity Weight loss",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R60",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Blood purifier ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R63 Drops for impaired circulation ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Impaired circulation ",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R64 Albuminuria Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Albuminuria ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R65 Psoriasis Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Psoriasis ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R71 Sciatica Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Sciatica ",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R72 Pancreas drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Pancreas ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R73 Drops for the joints",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Joint drops ",
        "subcategories": [
            {
                "MRP": 285,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R74 Drops for Nocturnal Enuresis ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Bed wetting ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R77 Anti smoking Drops ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Anti smoking ",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R78 Eye Care drrops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Eye care",
        "subcategories": [
            {
                "MRP": 270,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R81 Analgesic Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Analgesic drop ",
        "subcategories": [
            {
                "MRP": 250,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R82 Anti Fungal drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Fungal infection ",
        "subcategories": [
            {
                "MRP": 330,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R85",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "High blood pressure ",
        "subcategories": [
            {
                "MRP": 330,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R87 Anti bacterial drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Anti bacterial",
        "subcategories": [
            {
                "MRP": 330,
                "Discounted Percentage": 5,
                "Stock Quantity": 5,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R88 Anti Viral Drops ",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Viral infection ",
        "subcategories": [
            {
                "MRP": 310,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "R89 Hair Care Drops",
        "company": "Dr Reckeweg ",
        "category": "Patents",
        "tags": "Hair Care ",
        "subcategories": [
            {
                "MRP": 330,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Utrofyne Syrup ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Uterine tonic ",
        "subcategories": [
            {
                "MRP": 100,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Nixocid Syrup 500ml",
        "company": "SBL",
        "category": "Patents",
        "tags": "Acidity, gasses ",
        "subcategories": [
            {
                "MRP": 235,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Nixocid Syrup ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Acidity gasses ",
        "subcategories": [
            {
                "MRP": 120,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Nixocid Tablet ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Acidity gasses ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Hertone ",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Uterine tonic ",
        "subcategories": [
            {
                "MRP": 220,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tonsilat Tablet ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Tonsils enlarge ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Femin tablet ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Femin tablet ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Omeo Allergy Tablets ",
        "company": "Bjain ",
        "category": "Patents",
        "tags": "ALLERGY ",
        "subcategories": [
            {
                "MRP": 155,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rheum Aid Tablets ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Joint rheumatism ",
        "subcategories": [
            {
                "MRP": 215,
                "Discounted Percentage": 10,
                "Stock Quantity": 4,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Throat Aid Tablets ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Throat ",
        "subcategories": [
            {
                "MRP": 215,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Allergic Aid Tablets ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Allergy ",
        "subcategories": [
            {
                "MRP": 215,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rite Hite tablet ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Height ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "AC9 Tablets for hair fall",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Hair fall ",
        "subcategories": [
            {
                "MRP": 215,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "AC9 Tablets for hair fall ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Hair fall ",
        "subcategories": [
            {
                "MRP": 500,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Pilgo tablets ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Piles ",
        "subcategories": [
            {
                "MRP": 200,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Flu Aid Tablets ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Flu",
        "subcategories": [
            {
                "MRP": 215,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Acne Aid Tablets",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Acne",
        "subcategories": [
            {
                "MRP": 200,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Omeo Calcium tablet ",
        "company": "Bjain ",
        "category": "Patents",
        "tags": "Calcium joint",
        "subcategories": [
            {
                "MRP": 140,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Pelvorin Tablets ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Leucorrhoea ",
        "subcategories": [
            {
                "MRP": 140,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Phytolacca Berry Tablet ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Weight loss obesity ",
        "subcategories": [
            {
                "MRP": 155,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "AT 200 Tabs Anti Traumatic Tabs",
        "company": "SBL",
        "category": "Patents",
        "tags": "Trauma injury ",
        "subcategories": [
            {
                "MRP": 140,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "AF Tabs Anti Flue Tabs",
        "company": "SBL",
        "category": "Patents",
        "tags": "Flue",
        "subcategories": [
            {
                "MRP": 155,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Tranquil Tablets ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Anxiety Sleep ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Formula D Tablets ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Bone joint ",
        "subcategories": [
            {
                "MRP": 460,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Biofungin",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Restore body functions ",
        "subcategories": [
            {
                "MRP": 847,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Relax head tablets ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Migraine Headache ",
        "subcategories": [
            {
                "MRP": 140,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Relax head drops",
        "company": "SBL",
        "category": "Patents",
        "tags": "Migraine headache ",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cineraria Maritima euphreshia eye drop",
        "company": "SBL",
        "category": "Patents",
        "tags": "Eye drop",
        "subcategories": [
            {
                "MRP": 125,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cineraria euphreshia eye drop",
        "company": "Bakson",
        "category": "Patents",
        "tags": "Eye drop ",
        "subcategories": [
            {
                "MRP": 120,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cineraria Maritima 10% eye drop ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Eye drop ",
        "subcategories": [
            {
                "MRP": 135,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Euphreshia 10% eye drop ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Eye drop ",
        "subcategories": [
            {
                "MRP": 90,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cineraria Maritima  eye drop",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Eye drop ",
        "subcategories": [
            {
                "MRP": 125,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Essentia Aurea Gold drops ",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Heart muscle tone ",
        "subcategories": [
            {
                "MRP": 200,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Cineraria Maritima schwabe alcohol free",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Eye drop ",
        "subcategories": [
            {
                "MRP": 200,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Dibonil Drops",
        "company": "SBL",
        "category": "Patents",
        "tags": "Diabetes sugar control ",
        "subcategories": [
            {
                "MRP": 135,
                "Discounted Percentage": 10,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Clearstone drops ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Kidney Bladder stone ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 10,
                "Stock Quantity": 7,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Azadirachta Indica 1x",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Skin diseases ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Bacopa Monnieri 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Memory ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Baptisia Tinctoria MT 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "High fever ",
        "subcategories": [
            {
                "MRP": 150,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Crataegus oxyacantha MT 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Heart cholesterol ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Daphne Indica 1X",
        "company": "SBL",
        "category": "Patents",
        "tags": "Tobacco de-addiction ",
        "subcategories": [
            {
                "MRP": 272,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Echinacea Angustifolia 1X",
        "company": "SBL",
        "category": "Patents",
        "tags": "Immunity booster ",
        "subcategories": [
            {
                "MRP": 272,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Fucus vesiculosus 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Obesity Weight loss ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ginseng 1X MT Tablets ",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "MT Tablets ",
        "subcategories": [
            {
                "MRP": 320,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Glycyrrhiza glabra 1X 25 gm",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Chronic bronchitis sore throat ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Holarrhena antidysenterica  kurchi 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Diarrhea dysentery ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rauwolfia Serpentina 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Blood pressure ",
        "subcategories": [
            {
                "MRP": 175,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Rauwolfia Serpentina 1X",
        "company": "SBL",
        "category": "Patents",
        "tags": "Blood pressure ",
        "subcategories": [
            {
                "MRP": 141,
                "Discounted Percentage": 10,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Sabal Serrulata 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Prostate enlargement ",
        "subcategories": [
            {
                "MRP": 160,
                "Discounted Percentage": 5,
                "Stock Quantity": 6,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Syzygium Jambolanum 1X",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Sugar control diabetes ",
        "subcategories": [
            {
                "MRP": 175,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Alpha WD",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Weak defence system ",
        "subcategories": [
            {
                "MRP": 110,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Alpha MP ",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Muscular pain",
        "subcategories": [
            {
                "MRP": 125,
                "Discounted Percentage": 5,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "B Trim Drops ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Weight Managment, Obesity ",
        "subcategories": [
            {
                "MRP": 215,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Card Aid ",
        "company": "Bakson ",
        "category": "Patents",
        "tags": "Heart muscle hypertension ",
        "subcategories": [
            {
                "MRP": 165,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Constinil Drops ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Digestive Problem, Constipation ",
        "subcategories": [
            {
                "MRP": 125,
                "Discounted Percentage": 10,
                "Stock Quantity": 10,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Good morning  constipation Drops ",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Digestive Problem, Constipation ",
        "subcategories": [
            {
                "MRP": 120,
                "Discounted Percentage": 5,
                "Stock Quantity": 3,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Passifiya Dropa ",
        "company": "Medisynth ",
        "category": "Patents",
        "tags": "Anxiety Sleep ",
        "subcategories": [
            {
                "MRP": 175,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Prostonum Drops ",
        "company": "SBL",
        "category": "Patents",
        "tags": "Urinary, Prostate frequent urination ",
        "subcategories": [
            {
                "MRP": 170,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Ruck pain drops ",
        "company": "Schwabe",
        "category": "Patents",
        "tags": "Back spondylitis ",
        "subcategories": [
            {
                "MRP": 195,
                "Discounted Percentage": 5,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "Spondin Drops ",
        "company": "Bhargava ",
        "category": "Patents",
        "tags": "Spondylitis back neck",
        "subcategories": [
            {
                "MRP": 185,
                "Discounted Percentage": 7,
                "Stock Quantity": 2,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "SBL Drop no 1",
        "company": "SBL",
        "category": "Patents",
        "tags": "Hair Care ",
        "subcategories": [
            {
                "MRP": 140,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "SBL Drop no 3",
        "company": "SBL",
        "category": "Patents",
        "tags": "Urinary, Urinary tract infection ",
        "subcategories": [
            {
                "MRP": 185,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    },
    {
        "title": "SBL Drop no 6",
        "company": "SBL",
        "category": "Patents",
        "tags": "Joint pain",
        "subcategories": [
            {
                "MRP": 185,
                "Discounted Percentage": 10,
                "Stock Quantity": 1,
                "Availability": "Available"
            }
        ]
    }
]



