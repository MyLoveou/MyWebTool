from rest_framework import serializers
from .models import Author, Novel, Software, QuickLink

class AuthorSerializer(serializers.ModelSerializer):
    """
    作者序列化器
    
    用于将 Author 模型转换为 JSON 格式，或将 JSON 数据反序列化为 Author 对象。
    """
    class Meta:
        model = Author
        fields = '__all__'

class NovelSerializer(serializers.ModelSerializer):
    """
    小说序列化器
    
    用于将 Novel 模型转换为 JSON 格式，或将 JSON 数据反序列化为 Novel 对象。
    """
    class Meta:
        model = Novel
        fields = '__all__'

class SoftwareSerializer(serializers.ModelSerializer):
    """
    软件序列化器
    
    用于将 Software 模型转换为 JSON 格式，或将 JSON 数据反序列化为 Software 对象。
    """
    class Meta:
        model = Software
        fields = '__all__'

class QuickLinkSerializer(serializers.ModelSerializer):
    """
    快捷链接序列化器
    
    用于将 QuickLink 模型转换为 JSON 格式，或将 JSON 数据反序列化为 QuickLink 对象。
    """
    class Meta:
        model = QuickLink
        fields = '__all__'
