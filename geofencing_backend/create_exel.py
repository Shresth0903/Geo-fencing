import pandas as pd

# Data for geofences
data = {
    'latitude': [
        28.585360, 28.585365, 28.585370, 28.585375, 28.585380,
        28.585300, 28.585250, 28.585200, 28.585150, 28.585100
    ],
    'longitude': [
        77.211460, 77.211465, 77.211470, 77.211475, 77.211480,
        77.211400, 77.211350, 77.211300, 77.211250, 77.211200
    ],
    'email': [
        'shresthpandey09@gmail.com', 'shresthdev93@gmail.com', 'aaiskmit@gmail.com', 
        'shashank.verma75@gmail,com', 'shrestwwe@gmail.com','igsinghnitin@gmail.com', 'renurani1110@gmail.com', 
        'anamikatrehanat.at@gmail.com', 'rajeshpandey09@gmail.com', 'ayushmanrathore173@gmail.com'
    ]
}

# Create DataFrame
df = pd.DataFrame(data)

# Save DataFrame to Excel
file_path = 'geofences.xlsx'
df.to_excel(file_path, index=False)
