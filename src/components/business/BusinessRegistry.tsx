import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../../config/firebase";

// Amenidades que la app FindLO2 reconoce con ícono propio
// (lib/widgets/restaurant_detail_modal.dart -> getAmenityIcon)
const KNOWN_AMENITIES = [
  "wifi",
  "a/c",
  "estacionamiento",
  "restaurante",
  "piscina",
  "bar",
  "gimnasio",
];

interface CategoryOption {
  categoryName: string;
  displayName: string;
}

interface Restaurant {
  id: string;
  name: string;
  category: string;
  info: string;
  rating: number;
  amenidades: string[];
  image: string;
  gallery: string[];
  latitud: number;
  longitud: number;
}

const emptyForm = {
  name: "",
  category: "",
  info: "",
  rating: "",
  amenidades: [] as string[],
  latitud: "",
  longitud: "",
};

const BusinessRegistry: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingImage, setExistingImage] = useState("");
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Restaurant | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "restaurants"), (snap) => {
      setRestaurants(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name ?? "",
            category: data.category ?? "",
            info: data.info ?? "",
            rating: data.rating ?? 0,
            amenidades: data.amenidades ?? [],
            image: data.image ?? "",
            gallery: data.gallery ?? [],
            latitud: data.latitud ?? 0,
            longitud: data.longitud ?? 0,
          };
        })
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getDocs(collection(db, "categories")).then((snap) => {
      setCategories(
        snap.docs.map((d) => ({
          categoryName: d.data().categoryName ?? "",
          displayName: d.data().displayName ?? d.data().categoryName ?? "",
        }))
      );
    });
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCoverFile(null);
    setGalleryFiles([]);
    setExistingImage("");
    setExistingGallery([]);
    setError("");
    setOpen(true);
  };

  const openEdit = (r: Restaurant) => {
    setEditingId(r.id);
    setForm({
      name: r.name,
      category: r.category,
      info: r.info,
      rating: String(r.rating),
      amenidades: r.amenidades,
      latitud: String(r.latitud),
      longitud: String(r.longitud),
    });
    setCoverFile(null);
    setGalleryFiles([]);
    setExistingImage(r.image);
    setExistingGallery(r.gallery);
    setError("");
    setOpen(true);
  };

  const handleClose = () => {
    if (saving) return;
    setOpen(false);
  };

  const uploadImage = async (restaurantId: string, file: File, path: string) => {
    const storage = getStorage();
    const fileRef = ref(storage, `restaurants/${restaurantId}/${path}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim() || !form.category.trim()) {
      setError("Nombre y categoría son obligatorios.");
      return;
    }
    setSaving(true);
    try {
      const baseData = {
        name: form.name.trim(),
        category: form.category.trim(),
        info: form.info.trim(),
        rating: Number(form.rating) || 0,
        amenidades: form.amenidades,
        latitud: Number(form.latitud) || 0,
        longitud: Number(form.longitud) || 0,
      };

      let id = editingId;
      if (!id) {
        const docRef = await addDoc(collection(db, "restaurants"), {
          ...baseData,
          image: "",
          gallery: [],
        });
        id = docRef.id;
      }

      let image = existingImage;
      if (coverFile) {
        const ext = coverFile.name.split(".").pop() || "jpg";
        image = await uploadImage(id, coverFile, `cover.${ext}`);
      }

      let gallery = existingGallery;
      if (galleryFiles.length > 0) {
        const uploaded = await Promise.all(
          galleryFiles.map((file, i) => {
            const ext = file.name.split(".").pop() || "jpg";
            return uploadImage(id as string, file, `gallery/${Date.now()}_${i}.${ext}`);
          })
        );
        gallery = [...existingGallery, ...uploaded];
      }

      await updateDoc(doc(db, "restaurants", id), {
        ...baseData,
        image,
        gallery,
      });

      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Error al guardar el negocio.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteDoc(doc(db, "restaurants", deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <Box sx={{ px: 5, py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#2D2D2D" }}>
            Registro de Negocios
          </Typography>
          <Typography sx={{ color: "#6B7280" }}>
            Negocios y restaurantes visibles en la app FindLO
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
          sx={{ bgcolor: "#4ADE80", fontWeight: 700, boxShadow: "none" }}
        >
          Agregar negocio
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>
                  <Avatar src={r.image} variant="rounded" />
                </TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.category}</TableCell>
                <TableCell>{r.rating}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openEdit(r)}>
                    <EditIcon sx={{ color: "#6B7280" }} />
                  </IconButton>
                  <IconButton onClick={() => setDeleteTarget(r)}>
                    <DeleteIcon sx={{ color: "#FF4151" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {restaurants.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography sx={{ color: "#6B7280", py: 2, textAlign: "center" }}>
                    Todavía no hay negocios registrados.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario de crear/editar */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingId ? "Editar negocio" : "Nuevo negocio"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Nombre"
              fullWidth
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Autocomplete
              freeSolo
              options={categories.map((c) => c.categoryName)}
              getOptionLabel={(option) => {
                const match = categories.find((c) => c.categoryName === option);
                return match ? match.displayName : option;
              }}
              value={form.category}
              onInputChange={(_, value) => setForm({ ...form, category: value })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categoría"
                  required
                  helperText="Debe coincidir con una categoría existente en la app para aparecer en el Directorio."
                />
              )}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              minRows={3}
              value={form.info}
              onChange={(e) => setForm({ ...form, info: e.target.value })}
            />
            <TextField
              label="Rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />
            <Autocomplete
              multiple
              options={KNOWN_AMENITIES}
              value={form.amenidades}
              onChange={(_, value) => setForm({ ...form, amenidades: value })}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} key={option} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Amenidades" placeholder="Selecciona..." />
              )}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Latitud"
                type="number"
                fullWidth
                value={form.latitud}
                onChange={(e) => setForm({ ...form, latitud: e.target.value })}
              />
              <TextField
                label="Longitud"
                type="number"
                fullWidth
                value={form.longitud}
                onChange={(e) => setForm({ ...form, longitud: e.target.value })}
              />
            </Box>

            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Imagen de portada
              </Typography>
              {existingImage && !coverFile && (
                <Avatar src={existingImage} variant="rounded" sx={{ width: 64, height: 64, mb: 1 }} />
              )}
              <Button variant="outlined" component="label">
                {coverFile ? coverFile.name : "Elegir imagen"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                />
              </Button>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Galería
              </Typography>
              {existingGallery.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                  {existingGallery.map((url) => (
                    <Avatar key={url} src={url} variant="rounded" sx={{ width: 48, height: 48 }} />
                  ))}
                </Box>
              )}
              <Button variant="outlined" component="label">
                {galleryFiles.length > 0
                  ? `${galleryFiles.length} imagen(es) seleccionadas`
                  : "Agregar imágenes"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => setGalleryFiles(Array.from(e.target.files ?? []))}
                />
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} disabled={saving}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={saving}
            sx={{ bgcolor: "#4ADE80", fontWeight: 700, boxShadow: "none" }}
          >
            {saving ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmación de borrado */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Eliminar negocio</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Seguro que quieres eliminar "{deleteTarget?.name}"? Dejará de verse en la app.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteTarget(null)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            sx={{ bgcolor: "#FF4151", fontWeight: 700, boxShadow: "none" }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessRegistry;
