/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/**
 * Xử lý bug logic thư viện DnD-kit khi Column là rỗng:
 * Phía FE sẽ tự tạo một cái card đặc biệt: Placeholder Card, không liên quan tới BE
 * Card đặc biệt này sẽ được ẩn ở giao diện UI người dùng
 * Cấu trúc Id của Card này để Unique thì:
 * "columnId-placeholder-card" (mỗi column chỉ có thể có tối đa một cái Placeholder Card)
 * Khi tạo phải đầy đủ: (_id, boardId, columnId, FE_placeholderCard)
 */
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
  }
}
