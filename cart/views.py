from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from catalog.models import Book
from .serializers import CartSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'success': False, 'message': 'Для добавления книги в корзину необходимо авторизоваться.'}, status=401)
        book_id = request.data.get('book_id')
        if not book_id:
            return Response({"error": "Book ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        cart, created = Cart.objects.get_or_create(user=request.user)
        book = Book.objects.filter(id=book_id).first()
        if not book:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, book=book)
        if not created:
            cart_item.quantity += 1
            cart_item.save()

        return Response({'success': True, "message": f'Книга "{book.title}" успешно добавлена в корзину.'}, status=status.HTTP_201_CREATED)

    def patch(self, request, item_id):
        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        new_quantity = request.data.get('quantity')
        if new_quantity is None or new_quantity <= 0:
            return Response({"error": "Quantity must be a positive number"}, status=status.HTTP_400_BAD_REQUEST)

        cart_item.quantity = new_quantity
        cart_item.save()

        return Response({"message": "Quantity updated successfully"}, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response({"message": "Item removed from cart successfully"}, status=status.HTTP_200_OK)
