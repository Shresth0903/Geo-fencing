import unittest
from geofencing_app.app import app

class GeofencingAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_geofences_endpoint(self):
        response = self.app.get('/download_excel')
        self.assertEqual(response.status_code, 200)

    def test_check_geofence_within(self):
        response = self.app.post('/check_geofence', json={
            "latitude": 28.585355,
            "longitude": 77.211799,
            "email": "shresthdev93@gmail.com"
        })
        self.assertEqual(response.status_code, 200)

    def test_check_geofence_outside(self):
        response = self.app.post('/check_geofence', json={
            "latitude": 28.580000,
            "longitude": 77.220000,
            "email": "shresthdev93@gmail.com"
        })
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
