import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const Fleet_Inventory = [
  {
    Vehicle_ID: 'V01',
    Model_Name: 'Piaggio Ape Cargo',
    Category: 'Micro 3-Wheeler',
    Max_Payload_Kg: 500,
    Cargo_Volume_CuFt: 100,
    Dimensions_Ft: '5.5 x 4.5 x 4.2',
    Base_Fare_INR: 250,
    Included_Km: 3,
    Per_Km_Rate_INR: 18,
    Free_Loading_Mins: 30,
    Active_Fleet_Count: 42,
    Available_Now: 12,
    Image_URL: './assets/vehicles/v01_piaggio_ape.png',
    Best_For: 'Urban e-commerce, courier parcels, micro retail supplies'
  },
  {
    Vehicle_ID: 'V02',
    Model_Name: 'Tata Ace Gold "Chhota Hathi"',
    Category: 'Mini Truck',
    Max_Payload_Kg: 750,
    Cargo_Volume_CuFt: 160,
    Dimensions_Ft: '7.2 x 4.9 x 5.0',
    Base_Fare_INR: 420,
    Included_Km: 4,
    Per_Km_Rate_INR: 22,
    Free_Loading_Mins: 45,
    Active_Fleet_Count: 68,
    Available_Now: 19,
    Image_URL: './assets/vehicles/v02_tata_ace.jpg',
    Best_For: 'FMCG goods, electrical appliances, home relocation cartons'
  },
  {
    Vehicle_ID: 'V03',
    Model_Name: 'Mahindra Bolero Maxi Truck Plus',
    Category: 'Pick-up LCV',
    Max_Payload_Kg: 1200,
    Cargo_Volume_CuFt: 240,
    Dimensions_Ft: '8.2 x 5.5 x 5.5',
    Base_Fare_INR: 650,
    Included_Km: 5,
    Per_Km_Rate_INR: 28,
    Free_Loading_Mins: 60,
    Active_Fleet_Count: 54,
    Available_Now: 14,
    Image_URL: './assets/vehicles/v03_mahindra_bolero.jpg',
    Best_For: 'Hardware, timber, textiles, agricultural produce, light machinery'
  },
  {
    Vehicle_ID: 'V04',
    Model_Name: 'Ashok Leyland Dost+',
    Category: 'Pick-up LCV',
    Max_Payload_Kg: 1500,
    Cargo_Volume_CuFt: 280,
    Dimensions_Ft: '9.0 x 5.6 x 6.0',
    Base_Fare_INR: 780,
    Included_Km: 5,
    Per_Km_Rate_INR: 30,
    Free_Loading_Mins: 60,
    Active_Fleet_Count: 38,
    Available_Now: 9,
    Image_URL: './assets/vehicles/v04_ashok_leyland_dost.jpg',
    Best_For: 'Heavy auto ancillaries, construction paints, bulk retail stock'
  },
  {
    Vehicle_ID: 'V05',
    Model_Name: 'Tata 407 LPT',
    Category: 'Light Commercial Truck',
    Max_Payload_Kg: 2500,
    Cargo_Volume_CuFt: 450,
    Dimensions_Ft: '10.5 x 6.2 x 6.5',
    Base_Fare_INR: 1200,
    Included_Km: 8,
    Per_Km_Rate_INR: 38,
    Free_Loading_Mins: 90,
    Active_Fleet_Count: 29,
    Available_Now: 7,
    Image_URL: './assets/vehicles/v05_tata_407.jpg',
    Best_For: 'Industrial fabrication, ceramic tiles, event gear, food crates'
  },
  {
    Vehicle_ID: 'V06',
    Model_Name: 'Eicher Pro 2049',
    Category: '14-ft Container',
    Max_Payload_Kg: 3500,
    Cargo_Volume_CuFt: 620,
    Dimensions_Ft: '14.2 x 6.8 x 7.0',
    Base_Fare_INR: 1600,
    Included_Km: 10,
    Per_Km_Rate_INR: 45,
    Free_Loading_Mins: 120,
    Active_Fleet_Count: 24,
    Available_Now: 5,
    Image_URL: './assets/vehicles/v06_eicher_pro.jpg',
    Best_For: 'Pharma consignments, FMCG distributor bulk pallets, electronics'
  },
  {
    Vehicle_ID: 'V07',
    Model_Name: 'Tata 1109',
    Category: '19-ft Heavy Commercial Truck',
    Max_Payload_Kg: 7000,
    Cargo_Volume_CuFt: 950,
    Dimensions_Ft: '19.5 x 7.5 x 7.5',
    Base_Fare_INR: 2400,
    Included_Km: 15,
    Per_Km_Rate_INR: 62,
    Free_Loading_Mins: 150,
    Active_Fleet_Count: 18,
    Available_Now: 4,
    Image_URL: './assets/vehicles/v07_tata_1109.jpg',
    Best_For: 'Inter-state manufacturing freight, raw steel coils, chemical drums'
  },
  {
    Vehicle_ID: 'V08',
    Model_Name: 'BharatBenz 1617R',
    Category: '22-ft Heavy HCV',
    Max_Payload_Kg: 10000,
    Cargo_Volume_CuFt: 1200,
    Dimensions_Ft: '22.0 x 7.8 x 8.0',
    Base_Fare_INR: 3800,
    Included_Km: 20,
    Per_Km_Rate_INR: 85,
    Free_Loading_Mins: 180,
    Active_Fleet_Count: 15,
    Available_Now: 3,
    Image_URL: './assets/vehicles/v08_bharatbenz_1617r.jpg',
    Best_For: 'Heavy engineering, heavy machinery, inter-city full truckload (FTL)'
  }
];

const Shippers_Customers = [
  {
    Customer_ID: 'CUST-101',
    Company_Name: 'QuickBite FMCG Distributors',
    Contact_Person: 'Rajesh Sundaram',
    City: 'Bengaluru',
    GSTIN: '29AAECQ1234F1Z5',
    Rating: 4.9,
    Credit_Limit_INR: 250000,
    Total_Bookings: 184
  },
  {
    Customer_ID: 'CUST-102',
    Company_Name: 'Decora Wood Crafts',
    Contact_Person: 'Priya Sharma',
    City: 'Hyderabad',
    GSTIN: '36AABCU5678G2Z1',
    Rating: 4.8,
    Credit_Limit_INR: 150000,
    Total_Bookings: 92
  },
  {
    Customer_ID: 'CUST-103',
    Company_Name: 'Sri Lakshmi Steel Traders',
    Contact_Person: 'Venkatesh Hegde',
    City: 'Chennai',
    GSTIN: '33AABCS9012H1Z8',
    Rating: 4.7,
    Credit_Limit_INR: 500000,
    Total_Bookings: 310
  },
  {
    Customer_ID: 'CUST-104',
    Company_Name: 'TechSphere Electronics Ltd',
    Contact_Person: 'Ananya Roy',
    City: 'Pune',
    GSTIN: '27AABCT3456J1Z4',
    Rating: 4.9,
    Credit_Limit_INR: 400000,
    Total_Bookings: 145
  },
  {
    Customer_ID: 'CUST-105',
    Company_Name: 'GreenHarvest Agro Hub',
    Contact_Person: 'Mohammed Farooq',
    City: 'Mumbai',
    GSTIN: '27AABCG7890K1Z2',
    Rating: 4.6,
    Credit_Limit_INR: 200000,
    Total_Bookings: 78
  }
];

const Bookings_Consignments = [
  {
    LR_Number: 'LV-9042',
    Customer_ID: 'CUST-101',
    Vehicle_ID: 'V02',
    Driver_ID: 'DRV-01',
    Pickup_Hub: 'Peenya Industrial Area, Gate 4 (BLR)',
    Drop_Hub: 'Electronic City Phase 1 (BLR)',
    Goods_Type: 'Packaged Confectionery (45 Boxes)',
    Status: 'In-Transit',
    Stepper_Step: 4,
    Est_Distance_Km: 34,
    Total_Fare_INR: 1140,
    Current_Location: 'Hebbal Flyover (13.0358° N, 77.5970° E)',
    Speed_Kmph: 12,
    Telematics_Alert: 'Traffic Chokehold at Hebbal Flyover (+32m delay)',
    EWay_Bill_No: '241908876521',
    Booking_Timestamp: '2026-10-15 08:30',
    Estimated_ETA: '45 mins remaining'
  },
  {
    LR_Number: 'LV-4810',
    Customer_ID: 'CUST-104',
    Vehicle_ID: 'V06',
    Driver_ID: 'DRV-04',
    Pickup_Hub: 'Bommasandra Industrial Area (BLR)',
    Drop_Hub: 'Chakan Auto Hub, Pune (PNQ)',
    Goods_Type: 'Server Racks & High-Precision Networking (Fragile)',
    Status: 'Delivered',
    Stepper_Step: 5,
    Est_Distance_Km: 840,
    Total_Fare_INR: 39400,
    Current_Location: 'Chakan Bay 3Dock (Delivered & Verified)',
    Speed_Kmph: 0,
    Telematics_Alert: 'Unloading Completed • POD Verified',
    EWay_Bill_No: '381907765412',
    Booking_Timestamp: '2026-10-14 14:00',
    Estimated_ETA: 'Delivered'
  },
  {
    LR_Number: 'LV-7731',
    Customer_ID: 'CUST-103',
    Vehicle_ID: 'V08',
    Driver_ID: 'DRV-08',
    Pickup_Hub: 'Bhiwandi Warehousing Zone, Sector 12 (MH)',
    Drop_Hub: 'Sriperumbudur SIPCOT Industrial Park (TN)',
    Goods_Type: 'Reinforced Steel Coils & Angles (9.8 MT)',
    Status: 'In-Transit',
    Stepper_Step: 4,
    Est_Distance_Km: 1220,
    Total_Fare_INR: 107500,
    Current_Location: 'NH44 Krishnagiri Tollway Bypass',
    Speed_Kmph: 62,
    Telematics_Alert: 'Express Transit • Normal Highway Flow',
    EWay_Bill_No: '491906654303',
    Booking_Timestamp: '2026-10-14 20:15',
    Estimated_ETA: '3 hrs 40 mins'
  },
  {
    LR_Number: 'LV-5120',
    Customer_ID: 'CUST-102',
    Vehicle_ID: 'V03',
    Driver_ID: 'DRV-03',
    Pickup_Hub: 'Guindy Industrial Estate (MAA)',
    Drop_Hub: 'Sanath Nagar Goods Yard (HYD)',
    Goods_Type: 'Teak Plywood & Hardwood Veneers',
    Status: 'Driver Assigned',
    Stepper_Step: 2,
    Est_Distance_Km: 610,
    Total_Fare_INR: 17730,
    Current_Location: 'Guindy Loading Dock 2',
    Speed_Kmph: 0,
    Telematics_Alert: 'Driver reached pickup dock; loading commences',
    EWay_Bill_No: '121905543294',
    Booking_Timestamp: '2026-10-15 09:15',
    Estimated_ETA: 'Loading in Progress'
  },
  {
    LR_Number: 'LV-3309',
    Customer_ID: 'CUST-105',
    Vehicle_ID: 'V01',
    Driver_ID: 'DRV-06',
    Pickup_Hub: 'Whitefield Export Promotion Industrial Park (BLR)',
    Drop_Hub: 'Koramangala 4th Block Hub (BLR)',
    Goods_Type: 'Organic Cold-Pressed Oils (30 Cans)',
    Status: 'Booked',
    Stepper_Step: 1,
    Est_Distance_Km: 19,
    Total_Fare_INR: 590,
    Current_Location: 'Whitefield Depo Stand',
    Speed_Kmph: 0,
    Telematics_Alert: 'Cancellation Grace Window Active (12m elapsed)',
    EWay_Bill_No: '651904432185',
    Booking_Timestamp: '2026-10-15 10:00',
    Estimated_ETA: 'Awaiting Driver Handshake'
  }
];

const Drivers_Fleet_Partners = [
  {
    Driver_ID: 'DRV-01',
    Name: 'Manjunath Gowda',
    Region_Code: 'KA',
    Vehicle_Assigned: 'Tata Ace Gold (KA-04-AB-4921)',
    Mobile: '+91 98451 22910',
    Rating: 4.92,
    Trips_Completed: 1420,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'En-Route (LV-9042)'
  },
  {
    Driver_ID: 'DRV-02',
    Name: 'Gurpreet Singh',
    Region_Code: 'NL',
    Vehicle_Assigned: 'Eicher Pro 3019 (NL-01-AF-8812)',
    Mobile: '+91 94191 88320',
    Rating: 4.88,
    Trips_Completed: 2180,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Available'
  },
  {
    Driver_ID: 'DRV-03',
    Name: 'Rameshwar Patil',
    Region_Code: 'MH',
    Vehicle_Assigned: 'Bolero Maxi (MH-14-GH-3319)',
    Mobile: '+91 98220 44912',
    Rating: 4.79,
    Trips_Completed: 940,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Docked (LV-5120)'
  },
  {
    Driver_ID: 'DRV-04',
    Name: 'Selvakumar S.',
    Region_Code: 'TN',
    Vehicle_Assigned: 'Eicher Pro 2049 (TN-22-BY-5104)',
    Mobile: '+91 94440 18273',
    Rating: 4.95,
    Trips_Completed: 1680,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Available'
  },
  {
    Driver_ID: 'DRV-05',
    Name: 'Syed Nizamuddin',
    Region_Code: 'TS',
    Vehicle_Assigned: 'Tata 407 (TS-09-EA-7620)',
    Mobile: '+91 98490 33819',
    Rating: 4.85,
    Trips_Completed: 1120,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Available'
  },
  {
    Driver_ID: 'DRV-06',
    Name: 'Arvind Yadav',
    Region_Code: 'KA',
    Vehicle_Assigned: 'Piaggio Ape (KA-05-MK-1102)',
    Mobile: '+91 99001 77218',
    Rating: 4.90,
    Trips_Completed: 890,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Standby (LV-3309)'
  },
  {
    Driver_ID: 'DRV-07',
    Name: 'Kartikeya Reddy',
    Region_Code: 'AP',
    Vehicle_Assigned: 'Ashok Leyland Dost+ (AP-28-TR-9043)',
    Mobile: '+91 98480 66291',
    Rating: 4.82,
    Trips_Completed: 1040,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Available'
  },
  {
    Driver_ID: 'DRV-08',
    Name: 'Balwinder Cheema',
    Region_Code: 'NL',
    Vehicle_Assigned: 'BharatBenz 1617R (NL-02-K-9921)',
    Mobile: '+91 98140 55192',
    Rating: 4.91,
    Trips_Completed: 2450,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'En-Route (LV-7731)'
  },
  {
    Driver_ID: 'DRV-09',
    Name: 'Deepak Salgaonkar',
    Region_Code: 'GA',
    Vehicle_Assigned: 'Bolero Maxi (GA-03-B-4412)',
    Mobile: '+91 98230 77140',
    Rating: 4.87,
    Trips_Completed: 780,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Available'
  },
  {
    Driver_ID: 'DRV-10',
    Name: 'Thangavelu Murugan',
    Region_Code: 'TN',
    Vehicle_Assigned: 'Tata Ace Gold (TN-07-CM-8834)',
    Mobile: '+91 94431 88921',
    Rating: 4.84,
    Trips_Completed: 1310,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Available'
  },
  {
    Driver_ID: 'DRV-11',
    Name: 'Vignesh Nayak',
    Region_Code: 'KA',
    Vehicle_Assigned: 'Tata 407 (KA-51-E-2390)',
    Mobile: '+91 97401 33281',
    Rating: 4.89,
    Trips_Completed: 1560,
    Verification_Status: 'Police Cleared & Aadhaar KYC Verified',
    Current_Status: 'Available'
  }
];

const Disputes_Claims = [
  {
    Claim_ID: 'CLM-LV4810-01',
    LR_Number: 'LV-4810',
    Policy_Ref: 'POL-DMG-02',
    Description: 'Minor rack bracket bending observed during uncrating at Chakan Bay 3',
    Claimed_Amount_INR: 4500,
    Settled_Amount_INR: 4500,
    Settlement_Status: 'Auto-Settled via AI Policy Desk',
    Resolution_Token: 'SETTLE-LV4810-AUTO',
    Resolution_Date: '2026-10-15'
  },
  {
    Claim_ID: 'CLM-LV9042-01',
    LR_Number: 'LV-9042',
    Policy_Ref: 'POL-DET-01',
    Description: 'Heavy arterial bottleneck at Hebbal Flyover causing 45m transit delay',
    Claimed_Amount_INR: 350,
    Settled_Amount_INR: 350,
    Settlement_Status: 'Detention Fee Waived (100%)',
    Resolution_Token: 'WAIVER-LV9042-AUTO',
    Resolution_Date: '2026-10-15'
  },
  {
    Claim_ID: 'CLM-LV3309-01',
    LR_Number: 'LV-3309',
    Policy_Ref: 'POL-CAN-03',
    Description: 'Shipper cancellation within 12 mins grace window; driver at depot',
    Claimed_Amount_INR: 590,
    Settled_Amount_INR: 590,
    Settlement_Status: 'Full 100% Refund Approved',
    Resolution_Token: 'REFUND-LV3309-AUTO',
    Resolution_Date: '2026-10-15'
  }
];

const Company_Logistics_Policies = [
  {
    Policy_Code: 'POL-DET-01',
    Category: 'Detention & Delays',
    Title: 'Traffic & Infrastructure Delay Detention Waiver',
    Rule_Summary: 'If GPS telematics confirms arterial chokehold (>30 min delay, avg speed <15 km/h), detention surcharges are 100% auto-waived.',
    Max_Auto_Settle_INR: 1500,
    Required_Proof: 'Live Telematics Speed Log (<15 km/h over 20 min stretch)',
    Status: 'Active Auto-Rule'
  },
  {
    Policy_Code: 'POL-DET-02',
    Category: 'Detention & Delays',
    Title: 'Shipper Loading Dock Detention Beyond Free Window',
    Rule_Summary: 'Excess waiting time beyond included loading minutes billed at flat rate of ₹3.50/min for LCV and ₹6.00/min for HCV.',
    Max_Auto_Settle_INR: 5000,
    Required_Proof: 'Dock In/Out Geofence Timestamp Validation',
    Status: 'Active Auto-Rule'
  },
  {
    Policy_Code: 'POL-DMG-01',
    Category: 'Cargo Protection',
    Title: 'Minor Transit Cargo Scuff & Enclosure Damage',
    Rule_Summary: 'Minor non-structural outer packaging damage covered up to ₹3,000 upon digital photo verification within 2 hrs of delivery.',
    Max_Auto_Settle_INR: 3000,
    Required_Proof: 'Unboxing Timestamped Photo & Driver E-Sign',
    Status: 'Active Auto-Rule'
  },
  {
    Policy_Code: 'POL-DMG-02',
    Category: 'Cargo Protection',
    Title: 'Certified Pallet Impact & Structural Damage',
    Rule_Summary: 'Transit insurance auto-settles up to ₹15,000 for verified internal cargo impact with digital consignment manifest.',
    Max_Auto_Settle_INR: 15000,
    Required_Proof: 'Surveyor Inspection / Digital Manifest Discrepancy Note',
    Status: 'Active Auto-Rule'
  },
  {
    Policy_Code: 'POL-CAN-01',
    Category: 'Cancellations',
    Title: 'Shipper Cancellation After Vehicle En-Route (>15 mins)',
    Rule_Summary: 'Cancellation fee of 20% of base fare allocated directly to driver partner compensation if truck is already in transit.',
    Max_Auto_Settle_INR: 500,
    Required_Proof: 'Driver GPS Position >2 km from base depot',
    Status: 'Active Auto-Rule'
  },
  {
    Policy_Code: 'POL-CAN-03',
    Category: 'Cancellations',
    Title: 'Shipper Cancellation Within Grace Window (<15 mins)',
    Rule_Summary: '100% full instant refund with zero cancellation penalty if cancelled within 15 minutes of booking creation.',
    Max_Auto_Settle_INR: 2000,
    Required_Proof: 'Booking Creation Timestamp vs Cancellation Request Timestamp',
    Status: 'Active Auto-Rule'
  },
  {
    Policy_Code: 'POL-WT-05',
    Category: 'Weight & Compliance',
    Title: 'Overloading Weight Tolerance & E-Way Bill Penalties',
    Rule_Summary: 'Weight variance up to 5% tolerated; excess weight beyond 5% requires instant vehicle upgrade or consignor unloading.',
    Max_Auto_Settle_INR: 10000,
    Required_Proof: 'Certified Weighbridge Slip with Calibrated Scale Certificate',
    Status: 'Active Auto-Rule'
  }
];

const wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(Fleet_Inventory), 'Fleet_Inventory');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(Shippers_Customers), 'Shippers_Customers');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(Bookings_Consignments), 'Bookings_Consignments');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(Drivers_Fleet_Partners), 'Drivers_Fleet_Partners');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(Disputes_Claims), 'Disputes_Claims');
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(Company_Logistics_Policies), 'Company_Logistics_Policies');

// Ensure public directory exists
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

// Write to root and public
XLSX.writeFile(wb, './LoadKaro_Database.xlsx');
XLSX.writeFile(wb, './public/LoadKaro_Database.xlsx');

console.log('Successfully generated LoadKaro_Database.xlsx with 6 sheets!');
