import * as Crypto from 'expo-crypto';

/**
 * Verilen metni SHA-256 algoritmasıyla hash'ler.
 * Şifreleri düz metin olarak saklamamak için kullanılır.
 */
export async function hashPassword(password) {
  const hashed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashed;
}
