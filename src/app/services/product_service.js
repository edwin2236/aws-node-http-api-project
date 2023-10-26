import { query } from '../utils/db_client.js'

export const getAllProducts = async () => {
  const { rows } = await query('SELECT product_description, sku_number, category_description FROM product_dimension')
  return { data: rows }
}
