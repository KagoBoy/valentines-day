"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Edit3, Trash2, Upload, Save, Camera } from "lucide-react"

interface Photo {
  id: number
  src: string
  alt: string
  description: string
}

interface PhotoGalleryManagerProps {
  photos: Photo[]
  onPhotosChange: (photos: Photo[]) => void
  isEditMode: boolean
  onToggleEditMode: () => void
}

export const PhotoGalleryManager = ({
  photos,
  onPhotosChange,
  isEditMode,
  onToggleEditMode,
}: PhotoGalleryManagerProps) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [newPhoto, setNewPhoto] = useState({
    src: "",
    alt: "",
    description: "",
  })

  const addPhoto = () => {
    if (newPhoto.src && newPhoto.alt && newPhoto.description) {
      const photo: Photo = {
        id: Math.max(...photos.map((p) => p.id), 0) + 1,
        ...newPhoto,
      }
      onPhotosChange([...photos, photo])
      setNewPhoto({ src: "", alt: "", description: "" })
      setShowAddForm(false)
    }
  }

  const deletePhoto = (id: number) => {
    onPhotosChange(photos.filter((photo) => photo.id !== id))
  }

  const updatePhoto = (updatedPhoto: Photo) => {
    onPhotosChange(photos.map((photo) => (photo.id === updatedPhoto.id ? updatedPhoto : photo)))
    setEditingPhoto(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewPhoto({ ...newPhoto, src: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative">
      {/* Edit Mode Toggle */}
      <div className="absolute -top-12 right-0 z-10">
        <button
          onClick={onToggleEditMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isEditMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isEditMode ? <X size={16} /> : <Edit3 size={16} />}
          {isEditMode ? "Sair da Edição" : "Editar Galeria"}
        </button>
      </div>

      {/* Add Photo Button */}
      {isEditMode && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full p-4 border-2 border-dashed border-rose-300 rounded-lg hover:border-rose-400 transition-colors flex items-center justify-center gap-2 text-rose-600 hover:text-rose-700"
          >
            <Plus size={24} />
            <span className="font-medium">Adicionar Nova Foto</span>
          </button>
        </motion.div>
      )}

      {/* Add Photo Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white rounded-lg p-6 border-2 border-rose-200 shadow-lg"
          >
            <h4 className="text-lg font-bold text-rose-800 mb-4 flex items-center gap-2">
              <Camera size={20} />
              Adicionar Nova Foto
            </h4>

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagem</label>
                <div className="flex gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer transition-colors"
                  >
                    <Upload size={16} />
                    Upload Imagem
                  </label>
                  <input
                    type="url"
                    placeholder="Ou cole a URL da imagem"
                    value={newPhoto.src}
                    onChange={(e) => setNewPhoto({ ...newPhoto, src: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                {newPhoto.src && (
                  <div className="mt-2">
                    <img
                      src={newPhoto.src || "/placeholder.svg"}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texto Alternativo</label>
                <input
                  type="text"
                  placeholder="Descrição da imagem"
                  value={newPhoto.alt}
                  onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <input
                  type="text"
                  placeholder="Descrição romântica da foto"
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={addPhoto}
                  disabled={!newPhoto.src || !newPhoto.alt || !newPhoto.description}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded transition-colors"
                >
                  <Save size={16} />
                  Adicionar Foto
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setNewPhoto({ src: "", alt: "", description: "" })
                  }}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Photo Form */}
      <AnimatePresence>
        {editingPhoto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white rounded-lg p-6 border-2 border-blue-200 shadow-lg"
          >
            <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Edit3 size={20} />
              Editar Foto
            </h4>

            <div className="space-y-4">
              {/* Current Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagem Atual</label>
                <img
                  src={editingPhoto.src || "/placeholder.svg"}
                  alt={editingPhoto.alt}
                  className="w-20 h-20 object-cover rounded border"
                />
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texto Alternativo</label>
                <input
                  type="text"
                  value={editingPhoto.alt}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, alt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <input
                  type="text"
                  value={editingPhoto.description}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => updatePhoto(editingPhoto)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                >
                  <Save size={16} />
                  Salvar Alterações
                </button>
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Grid with Edit Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            {/* Edit Mode Overlay */}
            {isEditMode && (
              <div className="absolute inset-0 bg-black/50 rounded-lg z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingPhoto(photo)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                  title="Editar foto"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                  title="Excluir foto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            {/* Photo Display */}
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg shadow-lg border-2 border-white flex items-center justify-center overflow-hidden">
              <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />
            </div>

            {/* Description Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-lg">
              <p className="text-white text-xs font-medium text-center">{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
