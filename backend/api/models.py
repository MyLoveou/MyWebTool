from django.db import models

class Author(models.Model):
    """
    作者模型
    
    用于存储小说作者的详细信息。
    """
    name = models.CharField(max_length=255, verbose_name="姓名")
    category = models.CharField(max_length=100, verbose_name="分类")
    tags = models.JSONField(default=list, verbose_name="标签")
    desc = models.TextField(verbose_name="简介")
    works = models.JSONField(default=list, verbose_name="代表作")  # 存储作品列表，每项包含 title 和 url
    avatar_url = models.URLField(max_length=500, verbose_name="头像链接")
    details = models.TextField(verbose_name="详细介绍")
    life_span = models.CharField(max_length=100, null=True, blank=True, verbose_name="生卒年")
    honors = models.TextField(null=True, blank=True, verbose_name="荣誉")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "作者"
        verbose_name_plural = "作者"

class Novel(models.Model):
    """
    小说模型
    
    用于存储推荐的小说信息。
    """
    name = models.CharField(max_length=255, verbose_name="书名")
    author = models.CharField(max_length=255, verbose_name="作者")
    desc = models.TextField(verbose_name="简介")
    details = models.TextField(verbose_name="详细介绍", default="", blank=True)
    category = models.CharField(max_length=100, verbose_name="分类")
    tags = models.JSONField(default=list, verbose_name="标签")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "小说"
        verbose_name_plural = "小说"

class Software(models.Model):
    """
    软件模型
    
    用于存储推荐的软件工具信息。
    """
    name = models.CharField(max_length=255, verbose_name="软件名")
    desc = models.TextField(verbose_name="描述")
    details = models.TextField(verbose_name="详细介绍", default="", blank=True)
    link = models.URLField(max_length=500, verbose_name="链接")
    tags = models.JSONField(default=list, verbose_name="标签")
    category = models.CharField(max_length=100, verbose_name="分类")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "软件"
        verbose_name_plural = "软件"

class QuickLink(models.Model):
    """
    快捷链接模型
    
    用于存储常用网站导航信息。
    """
    name = models.CharField(max_length=255, verbose_name="网站名")
    url = models.URLField(max_length=500, verbose_name="链接")
    desc = models.TextField(verbose_name="描述")
    category = models.CharField(max_length=100, verbose_name="分类")  # 例如: "开发社区"
    icon = models.URLField(max_length=500, null=True, blank=True, verbose_name="图标链接")
    detailed_desc = models.TextField(null=True, blank=True, verbose_name="详细描述")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "网站导航"
        verbose_name_plural = "网站导航"

