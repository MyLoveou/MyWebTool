from rest_framework import viewsets
from .models import Author, Novel, Software, QuickLink
from .serializers import AuthorSerializer, NovelSerializer, SoftwareSerializer, QuickLinkSerializer
from .permissions import IsAdminOrReadOnly

class AuthorViewSet(viewsets.ModelViewSet):
    """
    作者视图集
    
    提供作者资源的 CRUD (增删改查) 接口。
    - GET /api/authors/ : 获取作者列表 (公开)
    - POST /api/authors/ : 创建新作者 (需管理员权限)
    - GET /api/authors/{name}/ : 获取指定作者详情 (公开)
    - PUT /api/authors/{name}/ : 更新作者信息 (需管理员权限)
    - DELETE /api/authors/{name}/ : 删除作者 (需管理员权限)
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    lookup_field = 'name'
    permission_classes = [IsAdminOrReadOnly]

class NovelViewSet(viewsets.ModelViewSet):
    """
    小说视图集
    
    提供小说资源的 CRUD (增删改查) 接口。
    - 读操作公开，写操作需管理员权限。
    """
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer
    lookup_field = 'name'
    permission_classes = [IsAdminOrReadOnly]

class SoftwareViewSet(viewsets.ModelViewSet):
    """
    软件视图集
    
    提供软件资源的 CRUD (增删改查) 接口。
    - 读操作公开，写操作需管理员权限。
    """
    queryset = Software.objects.all()
    serializer_class = SoftwareSerializer
    lookup_field = 'name'
    permission_classes = [IsAdminOrReadOnly]

class QuickLinkViewSet(viewsets.ModelViewSet):
    """
    快捷链接视图集
    
    提供网站导航资源的 CRUD (增删改查) 接口。
    - 读操作公开，写操作需管理员权限。
    """
    queryset = QuickLink.objects.all()
    serializer_class = QuickLinkSerializer
    lookup_field = 'name'
    permission_classes = [IsAdminOrReadOnly]
