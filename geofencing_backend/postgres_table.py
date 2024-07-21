from sqlalchemy import Column, Integer, String
from geoalchemy2 import Geometry
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class GeoDB(Base):
    __tablename__ = 'geodb1'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    geom = Column(Geometry(geometry_type='POINT', srid=4326))

    def __repr__(self):
        return f"<GeoDB(id={self.id}, name={self.name}, geom={self.geom})>"
