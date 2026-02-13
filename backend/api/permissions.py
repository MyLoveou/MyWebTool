from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    自定义权限类：允许管理员进行所有操作，普通用户仅允许只读操作 (GET, HEAD, OPTIONS)。
    """
    
    def has_permission(self, request, view):
        # 允许所有只读请求
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # 写操作仅允许管理员用户
        return request.user and request.user.is_staff
