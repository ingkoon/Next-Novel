from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text

Base = declarative_base()


class NovelContent(Base):
    __tablename__ = 'novel_content'

    id = Column(Integer, primary_key=True)
    novel_id = Column(Integer)
    content = Column(Text)
