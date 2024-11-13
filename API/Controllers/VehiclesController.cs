using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VehiclesController(IUnitOfWork uow) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<PagedList<VehicleDto>>> GetPagedListAsync(VehicleParams param) {
            PagedList<VehicleDto> pagedList = await uow.VehicleRepository.GetPagedListAsync(param);

            Response.AddPaginationHeader(pagedList);

            return pagedList;
        }
        
        [HttpPost]
        public async Task<ActionResult<VehicleDto?>> CreateAsync([FromBody] VehicleCreateDto request)
        {
            if (request.Brand == null) return BadRequest("La marca es requerida.");

            if (!request.Brand.Id.HasValue) return BadRequest("El ID de la marca es requerido");

            int brandId = request.Brand.Id.Value;

            if (!await uow.BrandRepository.ExistsByIdAsync(brandId)) return NotFound($"La marca con ID {brandId} no existe.");

            if (request.Photos.Count() == 0) return BadRequest("Las fotos son requeridas.");

            Vehicle itemToCreate = new();

            itemToCreate.Color = request.Color;
            itemToCreate.Year = request.Year;
            itemToCreate.Model = request.Model;

            itemToCreate.VehicleBrand = new(brandId);

            foreach(PhotoDto item in request.Photos) {
                if (!string.IsNullOrEmpty(item.Url)) {
                    itemToCreate.VehiclePhotos.Add(new(item.Url));
                }
            }

            uow.VehicleRepository.Add(itemToCreate);

            if (!await uow.CompleteAsync()) return BadRequest("Errores al agregar el vehículo.");

            return await uow.VehicleRepository.GetDtoByIdAsync(itemToCreate.Id);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto?>> GetDtoByIdAsync([FromRoute]int id)
        {
            if (!await uow.VehicleRepository.ExistsByIdAsync(id)) return NotFound($"El vehículo con ID {id} no fue encontrado.");

            return await uow.VehicleRepository.GetDtoByIdAsync(id);
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVehicle(int id)
        {
            await Task.Delay(0);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync([FromRoute]int id, [FromBody] VehicleCreateDto request)
        {
            await Task.Delay(0);
            
            return Ok();
        }
    }
}
