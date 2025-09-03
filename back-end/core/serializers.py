from rest_framework import serializers
from .models import Akun, Jurnal, DetailJurnal

class AkunSerializer(serializers.ModelSerializer):
    class Meta:
        model = Akun
        fields = '__all__'

class DetailJurnalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailJurnal
        fields = ['akun', 'debit', 'kredit']

class JurnalSerializer(serializers.ModelSerializer):
    detail_jurnal = DetailJurnalSerializer(many=True)

    class Meta:
        model = Jurnal
        fields = ['id', 'tanggal', 'deskripsi', 'detail_jurnal']

    def create(self, validated_data):
        detail_data = validated_data.pop('detail_jurnal')
        jurnal = Jurnal.objects.create(**validated_data)
        for detail in detail_data:
            DetailJurnal.objects.create(jurnal=jurnal, **detail)
        return jurnal